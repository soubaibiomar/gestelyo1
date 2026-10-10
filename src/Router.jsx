import React from "react";
import App from "./App.jsx";
import ContentPage from "./ContentPage.jsx";
import { normalizePath } from "./content.mjs";

export default function Router({ path = "/" }) {
  const route = normalizePath(path);
  return route === "/" || route === "/demo/" ? <App demoOnly={route === "/demo/"} /> : <ContentPage path={route} />;
}
