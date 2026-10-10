import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { siteOrigin, publicationOrigin, structuredData } from "./site-config.mjs";
import { plans, additionalUserMonthly } from "../src/pricing.mjs";
import { routeMeta, normalizePath } from "../src/content.mjs";

assert.deepEqual(plans.map(({monthly, annual, users, annualSaving}) => [monthly, annual, users, annualSaving]), [
  [450, 5130, 3, 270],
  [600, 6660, 5, 540],
  [900, 9720, 10, 1080],
], "Tarifs avec remises annuelles de 5 %, 7,5 % et 10 %");
assert.equal(additionalUserMonthly, 120);
assert.deepEqual(plans.map(plan => plan.annualDiscount), [5, 7.5, 10], 'Remises annuelles approuvées');
const pricingHtml = await readFile('dist/tarifs/index.html', 'utf8');
for (const text of ['Enterprise', 'Sur devis', 'Pack crédits IA', 'Migration Excel/CSV assistée', 'Support prioritaire', 'Formation personnalisée', 'Infrastructure dédiée', 'Développement spécifique']) {
  assert.ok(pricingHtml.includes(text), `${text} présent sur la page tarifs`);
}

const html = await readFile("dist/index.html", "utf8");
assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, "Un seul h1");
assert.equal((html.split('</head>')[0].match(/<title>/g) || []).length, 1, "Un seul titre de document, hors titres SVG");
assert.equal(
  (html.match(/name="description"/g) || []).length,
  1,
  "Une description",
);
assert.match(html, /<html lang="fr">/);
for (const text of [
  "progiciel de gestion intégré",
  "Comment définir Gestelyo",
  "Quels sont les tarifs",
  "données et entreprises fictives",
  "Finance",
])
  assert.ok(html.includes(text), `${text} présent sans JS`);
for (const id of ["produit", "secteurs", "modules", "tarifs", "questions"])
  assert.ok(html.includes(`id="${id}"`), `Section ${id} présente`);
assert.ok(!html.includes("<!--app-html-->"));
assert.match(html, /<details>/);
assert.match(html, /<summary>/);
const schema = JSON.parse(
  html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
);
assert.equal(schema["@context"], "https://schema.org");
assert.equal(schema['@graph'].find(node => node['@type'] === 'WebSite').alternateName, 'Gestelyo ERP');
assert.ok(html.includes('Gestelyo, le projet d’ERP pour les PME au Maroc'), 'Marque et périmètre visibles dans la présentation');
assert.ok(
  !JSON.stringify(schema).match(/"(offers|aggregateRating|review|address)"/),
  "Pas de preuve commerciale inventée",
);
const origin = publicationOrigin();
if (origin) {
  assert.match(html, /content="index, follow, max-image-preview:large"/);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.ok(html.includes(`href="${origin}/"`));
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  assert.ok(sitemap.includes(`<loc>${origin}/</loc>`));
  assert.ok(
    (await readFile("dist/robots.txt", "utf8")).includes(
      `Sitemap: ${origin}/sitemap.xml`,
    ),
  );
} else {
  assert.match(html, /content="noindex, follow"/);
  assert.ok(!html.includes('rel="canonical"'));
  await assert.rejects(
    access("dist/sitemap.xml"),
    "Pas de sitemap avec domaine inventé",
  );
}
for (const invalid of [
  "http://example.com",
  "https://localhost",
  "https://127.0.0.1",
  "https://10.0.0.1",
  "https://example.com/private",
  "https://user:password@example.com",
  "https://example.com/?q=x",
])
  assert.throws(() => siteOrigin(invalid));
assert.equal(siteOrigin("https://example.com/"), "https://example.com");
assert.equal(
  structuredData("https://example.com")["@graph"][1].url,
  "https://example.com/",
);
assert.match(await readFile("dist/404.html", "utf8"), /noindex,follow/);
const pages = new Map();
const titles = new Set();
const descriptions = new Set();
for (const [path, meta] of Object.entries(routeMeta)) {
  const content = await readFile(`dist${path}index.html`, "utf8");
  pages.set(path, content);
  assert.equal((content.match(/<h1[\s>]/g) || []).length, 1, `${path} : un H1`);
  assert.ok(!titles.has(meta.title), `${path} : titre unique`);
  assert.ok(!descriptions.has(meta.description), `${path} : description unique`);
  titles.add(meta.title); descriptions.add(meta.description);
  assert.ok(content.includes(meta.description), `${path} : description dans le HTML`);
  assert.ok(!content.includes("<!--app-html-->"));
  assert.ok(!content.includes('<title></title>'), `${path} : titres SVG renseignés pour éviter les écarts d’hydratation`);
  const visibleCopy = content.split('</head>')[1].replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' ');
  assert.ok(!/[—–_-]/.test(visibleCopy), `${path} : texte sans tirets : ${visibleCopy.match(/.{0,30}[—–_-].{0,30}/g)?.join(' ; ')}`);
  const data = JSON.parse(content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(data["@graph"][1].name, meta.title, `${path} : JSON-LD cohérent`);
  const organization = data['@graph'].find(node => node['@type'] === 'Organization');
  assert.deepEqual(organization.email, ['contact@gestelyo.com', 'omarsoubaibi@gestelyo.com', 'redachouikh@gestelyo.com']);
  if (meta.answer) {
    assert.ok(content.includes(meta.answer[0]) && content.includes(meta.answer[1]), `${path} : réponse visible sans JavaScript`);
    assert.equal(data['@graph'][1].abstract, meta.answer[1]);
  }
  if (meta.layout === 'article') {
    assert.ok(data['@graph'].some(node => node['@type'] === 'Article' && node.headline === meta.heading));
  }
  const publicGraph = structuredData('https://example.com', path, meta)['@graph'];
  assert.equal(publicGraph[1].url, `https://example.com${path}`);
  if (meta.eyebrow && meta.layout !== 'pricing') assert.ok(publicGraph.some(node => node['@type'] === 'BreadcrumbList'));
  assert.ok(!content.includes("Mois offerts en annuel"), "Ligne retirée du comparatif");
  if (origin) {
    assert.ok(content.includes(`href="${origin}${path}"`), `${path} : canonical correcte`);
    assert.ok((await readFile("dist/sitemap.xml", "utf8")).includes(`<loc>${origin}${path}</loc>`));
  } else {
    assert.match(content, /content="noindex, follow"/);
  }
}
for (const [path, content] of pages) {
  for (const [, href] of content.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const url = new URL(href, `https://validation.example${path}`);
    const target = normalizePath(url.pathname);
    assert.ok(pages.has(target), `${path} : destination interne ${href}`);
    if (url.hash) assert.ok(pages.get(target).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${path} : ancre ${href}`);
  }
}
console.log(
  `SEO/GEO : ${pages.size} pages, liens internes, métadonnées, JSON-LD, tarifs et politique de publication vérifiés.`,
);
