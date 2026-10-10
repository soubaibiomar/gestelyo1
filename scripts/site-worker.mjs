import { canonicalOrigin } from '../site.config.mjs';
import { routeMeta } from '../src/content.mjs';

const canonicalHost = new URL(canonicalOrigin).hostname;
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const publicHost = [canonicalHost, `www.${canonicalHost}`].includes(url.hostname);
    const path = url.pathname.replace(/\/index(?:\.html)?$/, '/');
    const normalized = path.endsWith('/') ? path : `${path}/`;
    const knownPage = Object.hasOwn(routeMeta, normalized);
    if (publicHost && (url.protocol !== 'https:' || url.hostname !== canonicalHost || (knownPage && normalized !== url.pathname))) {
      const destination = new URL(canonicalOrigin);
      destination.pathname = knownPage ? normalized : url.pathname;
      destination.search = url.search;
      return Response.redirect(destination.href, 308);
    }
    const asset = await env.ASSETS.fetch(request);
    const response = new Response(asset.body, asset);
    // Preview hostnames stay available to reviewers but must not compete in search.
    if (!publicHost || asset.status === 404) response.headers.set('X-Robots-Tag', 'noindex, follow');
    return response;
  },
};
