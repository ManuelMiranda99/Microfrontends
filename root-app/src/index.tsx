import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { registerApplication, LifeCycles, start } from "single-spa";
import { newPages } from "./shared/constants/Pages";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div>
      <App />
    </div>
  </React.StrictMode>
);

const importPages = newPages
  .map((page) => `"@${page.htmlImport}/${page.name}" : "${page.import}"`)
  .join(",");

const importsText = `{ "imports": { ${importPages} } }`;

const SCRIPT: HTMLElement = document.createElement("script");
SCRIPT.appendChild(document.createTextNode(importsText));
// @ts-ignore
SCRIPT.type = "systemjs-importmap";
document.head.appendChild(SCRIPT);

newPages.forEach((page) => {
  const promiseImport =
    page.type === "REACT" ? `@${page.htmlImport}/${page.name}` : page.import;

  registerApplication({
    name: page.name,
    app: (): Promise<LifeCycles> =>
      (window as any).System.import(promiseImport),
    activeWhen: page.appRoute,
  });
});

start();
