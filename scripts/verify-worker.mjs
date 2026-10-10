import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import worker from './site-worker.mjs';

const config = JSON.parse(await readFile('wrangler.jsonc', 'utf8'));
assert.equal(config.name, 'gestelyo1');
assert.equal(config.assets.not_found_handling, '404-page');
assert.equal(config.assets.run_worker_first, true);
const noAssets = { ASSETS: { fetch() { throw new Error('Redirect must happen before serving content'); } } };
for (const url of ['http://gestelyo.com/modules/crm?ref=test', 'https://www.gestelyo.com/modules/crm/?ref=test', 'https://gestelyo.com/modules/crm/index.html?ref=test']) {
  const result = await worker.fetch(new Request(url), noAssets);
  assert.equal(result.status, 308);
  assert.equal(result.headers.get('location'), 'https://gestelyo.com/modules/crm/?ref=test');
}
for (const [url, status, noindex] of [['https://gestelyo.com/', 200, false], ['https://gestelyo.com/missing/', 404, true], ['https://preview.workers.dev/', 200, true]]) {
  const result = await worker.fetch(new Request(url), { ASSETS: { fetch: async () => new Response('asset', {status, headers:{'x-content-type-options':'nosniff'}}) } });
  assert.equal(result.status, status);
  assert.equal(result.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(result.headers.has('x-robots-tag'), noindex);
  assert.equal(await result.text(), 'asset');
}
assert.match(await readFile('dist/404.html', 'utf8'), /noindex,follow/);
console.log('Worker: HTTPS/host/path redirects, query preservation, preview noindex and asset response preservation verified.');
