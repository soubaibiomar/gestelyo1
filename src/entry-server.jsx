import React from "react";
import { renderToString } from "react-dom/server";
import Router from "./Router.jsx";
export function render(path = "/") {
  return renderToString(
    <React.StrictMode>
      <Router path={path} />
    </React.StrictMode>,
  );
}
