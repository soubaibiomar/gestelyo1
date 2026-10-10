import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import Router from "./Router.jsx";
import { normalizePath, routeMeta } from "./content.mjs";
import "@fontsource-variable/manrope";
import "@fontsource-variable/albert-sans";

import "./styles.css";
import "./refonte.css";
import "./graphic.css";
import "./editorial.css";

const root = document.getElementById("root");
const path = normalizePath(window.location.pathname);
const meta = routeMeta[path];
document.title = meta?.title || "Page introuvable | Gestelyo";
if (meta) {
  for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) document.querySelector(selector)?.setAttribute("content", meta.description);
  for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) document.querySelector(selector)?.setAttribute("content", meta.title);
}
const page = (
  <React.StrictMode>
    <Router path={path} />
  </React.StrictMode>
);
if (root.childElementCount > 0) hydrateRoot(root, page);
else createRoot(root).render(page);
