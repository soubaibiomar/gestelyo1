import assert from 'node:assert/strict';
import { routeMeta } from '../src/content.mjs';
const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:4174';
const results = await Promise.allSettled(Object.keys(routeMeta).map(async path => {
  const response = await fetch(`${origin}${path}`);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.ok(html.includes(routeMeta[path].description.replaceAll('&', '&amp;')), `Route directe : ${path}`);
  return path;
}));
for (const result of results) if (result.status === 'rejected') throw result.reason;
assert.equal((await fetch(`${origin}/modules/crm`, { redirect: 'manual' })).status, 308);
assert.equal((await fetch(`${origin}/page-inconnue/`)).status, 404);
assert.equal((await fetch(`${origin}/gestelyo-logo.png`)).status, 200);
console.log(`${results.length} routes directes, redirection, page introuvable et logo vérifiés sur ${origin}.`);
