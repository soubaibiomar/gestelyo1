import { readFile, writeFile, mkdir } from "node:fs/promises";
import { build } from "vite";
import { publicationOrigin, structuredData } from "./site-config.mjs";
import { routeMeta } from "../src/content.mjs";

const origin = publicationOrigin();
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
await build({ build: { ssr: "src/entry-server.jsx", outDir: ".prerender", emptyOutDir: true } });
const { render } = await import("../.prerender/entry-server.js");
const template = await readFile("dist/index.html", "utf8");
if (!template.includes("<!--app-html-->")) throw new Error("Point d’insertion du prérendu introuvable.");
for (const [path, meta] of Object.entries(routeMeta)) {
  let html = template.replace("<!--app-html-->", () => render(path));
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(meta.title)}</title>`);
  html = html.replace(/(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*"/g, (_, start) => `${start}${escapeHtml(meta.description)}"`);
  html = html.replace(/(<meta\s+(?:name|property)="(?:og:title|twitter:title)"\s+content=")[^"]*"/g, (_, start) => `${start}${escapeHtml(meta.title)}"`);
  const metadata = [`<script type="application/ld+json">${JSON.stringify(structuredData(origin, path, meta)).replaceAll("<", "\\u003c")}</script>`];
  if (origin) {
    html = html.replace("noindex, follow", "index, follow, max-image-preview:large");
    metadata.push(`<link rel="canonical" href="${origin}${path}" />`, `<meta property="og:url" content="${origin}${path}" />`, `<meta property="og:image" content="${origin}/gestelyo-logo.png" />`, '<meta property="og:image:alt" content="Logo Gestelyo, un G en ruban bleu et teal" />', `<meta name="twitter:image" content="${origin}/gestelyo-logo.png" />`);
  }
  html = html.replace("<!--publication-meta-->", () => metadata.join("\n"));
  const directory = path === "/" ? "dist" : `dist${path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
}
if (origin) {
  await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(routeMeta).map(path => `<url><loc>${origin}${path}</loc></url>`).join("")}</urlset>\n`);
  const robots = await readFile("public/robots.txt", "utf8");
  await writeFile("dist/robots.txt", `${robots.trim()}\n\nSitemap: ${origin}/sitemap.xml\n`);
}
await writeFile("dist/404.html", '<!doctype html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Page introuvable | Gestelyo</title></head><body><main><h1>Cette page n’existe pas.</h1><p>Retrouvez Gestelyo sur la page d’accueil.</p><a href="/">Retour à Gestelyo</a></main></body></html>');
console.log(`${Object.keys(routeMeta).length} pages prérendues. ${origin ? `Origine : ${origin} ; canonical et sitemap générés.` : "Aperçu noindex ; renseigner SITE_URL pour publier."}`);
