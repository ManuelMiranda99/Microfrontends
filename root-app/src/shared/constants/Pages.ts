import { NewPage, Page } from "../interfaces/SingleSpa.interface";

export const pages: Page[] = [
  {
    label: "React",
    name: "app-react",
    route: "/react",
    appRoute: "",
  },
  {
    label: "Angular",
    name: "app-angular",
    route: "/angular",
    appRoute: "",
  },
];

export const newPages: NewPage[] = [
  {
    appRoute: "/react",
    htmlImport: "single-spa-test",
    import: "http://localhost:8080/single-spa-test-app-react.js",
    label: "React",
    name: "app-react",
    type: "REACT",
  },
  {
    appRoute: "/angular",
    htmlImport: "single-spa-test",
    import: "http://localhost:4200/main.js",
    label: "Angular",
    name: "app-angular",
    type: "ANGULAR",
  },
];
