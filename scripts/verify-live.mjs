import { mkdir, writeFile } from 'node:fs/promises';
import { routeMeta } from '../src/content.mjs';
import { canonicalOrigin as origin } from '../site.config.mjs';

const checks = [];
async function inspect(url, expected, validate = () => []) {
  try {
    const response = await fetch(url, {redirect:'manual', signal:AbortSignal.timeout(15000)});
    const html = await response.text();
    const failures = response.status === expected ? [] : [`HTTP ${response.status}, attendu ${expected}`];
    failures.push(...validate(response, html));
    checks.push({url,status:response.status,failures});
  } catch (error) { checks.push({url,failures:[error.message]}); }
}
// Bounded sequential checks; no forms, authentication or crawler impersonation.
for (const [path, meta] of Object.entries(routeMeta)) await inspect(origin + path, 200, (response, html) => [
  ...(!html.includes(`<title>${meta.title}</title>`) ? ['Version du titre différente du dépôt'] : []),
  ...(!html.includes(`rel="canonical" href="${origin}${path}"`) ? ['Canonical absente ou incorrecte'] : []),
  ...(/noindex/i.test(response.headers.get('x-robots-tag') || '') || /name="robots"[^>]*noindex/i.test(html) ? ['Noindex inattendu'] : []),
  ...(!html.includes('<h1') ? ['Contenu principal absent du HTML'] : []),
]);
await inspect(`${origin}/robots.txt`, 200, (_, text) => text.includes(`Sitemap: ${origin}/sitemap.xml`) ? [] : ['Sitemap absent de robots.txt']);
await inspect(`${origin}/sitemap.xml`, 200, (_, text) => Object.keys(routeMeta).filter(path => !text.includes(`<loc>${origin}${path}</loc>`)).map(path => `URL absente : ${path}`));
await inspect(`${origin}/page-inconnue-audit-gestelyo/`, 404);
for (const host of ['http://gestelyo.com', 'http://www.gestelyo.com', 'https://www.gestelyo.com']) {
  try {
    const url = `${host}/modules/crm/?source=verification`;
    const response = await fetch(url, {redirect:'manual',signal:AbortSignal.timeout(15000)});
    checks.push({url,status:response.status,failures:[
      ...(![301,308].includes(response.status) ? ['Redirection permanente absente'] : []),
      ...(response.headers.get('location') !== `${origin}/modules/crm/?source=verification` ? ['Destination incorrecte ou paramètres perdus'] : []),
    ]});
    await response.arrayBuffer();
  } catch (error) { checks.push({url:host,failures:[error.message]}); }
}
await mkdir('outputs',{recursive:true});
await writeFile('outputs/live-search-verification.json',JSON.stringify({checkedAt:new Date().toISOString(),checks},null,2));
const failures = checks.filter(check => check.failures.length);
console.log(`${checks.length} contrôles publics ; ${failures.length} écarts.`);
for (const failure of failures) console.log(failure.url, failure.failures.join(' ; '));
process.exitCode = failures.length ? 1 : 0;
