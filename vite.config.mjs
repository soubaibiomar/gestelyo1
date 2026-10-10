import { defineConfig } from "vite";
import { readFile } from "node:fs/promises";
import { routeMeta, normalizePath } from "./src/content.mjs";

function routeMiddleware(server) {
  server.middlewares.use(async (req, res, next) => {
    if (!["GET", "HEAD"].includes(req.method)) return next();
    const url = new URL(req.url, "http://localhost");
    const path = url.pathname;
    if (path === "/sitemap.xml") {
      try { await readFile("dist/sitemap.xml"); return next(); }
      catch { res.statusCode = 404; res.end("Sitemap absent en prévisualisation."); return; }
    }
    if (path.includes(".") || path.startsWith("/@") || path.startsWith("/src/") || path.startsWith("/node_modules/")) return next();
    const canonical = normalizePath(path);
    if (routeMeta[canonical]) {
      if (path !== canonical) { res.writeHead(308, { Location: `${canonical}${url.search}` }); res.end(); return; }
      return next();
    }
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    try { res.end(req.method === "HEAD" ? "" : await readFile("dist/404.html", "utf8")); }
    catch { res.end('<h1>Page introuvable</h1><a href="/">Accueil</a>'); }
  });
}

async function previewMiddleware(server) {
  // Exercise the deployment policy locally, without restricting Vite's development client.
  const policy = await readFile("dist/_headers", "utf8");
  const headers = Object.fromEntries(policy.split(/\r?\n/).filter(line => /^  [A-Za-z-]+:/.test(line)).map(line => {
    const colon = line.indexOf(":");
    return [line.slice(0, colon).trim(), line.slice(colon + 1).trim()];
  }));
  server.middlewares.use((req, res, next) => {
    for (const [name, value] of Object.entries(headers)) {
      if (name !== "Strict-Transport-Security") res.setHeader(name, value);
    }
    next();
  });
  routeMiddleware(server);
}

export default defineConfig({ plugins: [{ name: "gestelyo-static-routes", configureServer: routeMiddleware, configurePreviewServer: previewMiddleware }] });
