# Pasos para el taller de Microfronts

## Crear la aplicación principal

Se utiliza el comando

```bash
npx create-react-app root-app --template typescript
```

Luego, dentro del proyecto se instala single-spa para poder registrar nuestros microfronts

```bash
npm i single-spa
```

Después, a este proyecto en el index.html se le agrega las siguientes líneas justo después del título de la aplicación

```html
<script src="https://unpkg.com/zone.js"></script>
<meta name="importmap-type" content="systemjs-importmap" />
<script type="systemjs-importmap">
  {
    "imports": {
      "@single-spa-test/app-angular": "http://localhost:4200/main.js",
      "@single-spa-test/app-react": "http://localhost:8080/single-spa-test-app-react.js"
    }
  }
</script>
<script
  type="systemjs-importmap"
  src="https://storage.googleapis.com/react.microfrontends.app/importmap.json"
></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.2.5/dist/system.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.2.5/dist/extras/amd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.2.5/dist/extras/named-exports.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.2.5/dist/extras/named-register.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/import-map-overrides/dist/import-map-overrides.js"></script>
```

Luego ya creamos nuestro componente para hacer todo el tema del ruteo. Nav en este caso

## Crear Microfronts

### Angular

Se crea un proyecto de angular y se instala single-spa-angular

```bash
ng new app-angular
ng add single-spa-angular
```

Y se crea el componente que deseamos mostrar. También, eliminar lo que nos genera angular automáticamente

```bash
ng g c angular
```

Y en nuestro archivo de rutas **app-routing.module** lo modificamos para que este de esta manera:

```typescript
import { APP_BASE_HREF } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AngularComponent } from "./angular/angular.component";

const routes: Routes = [
  {
    path: "angular",
    component: AngularComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
})
export class AppRoutingModule {}
```

### React

Para este caso solamente crearemos el proyecto de react con:

```bash
npx create-single-spa
```

Estar atento a los nombres que colocamos en lo que nos pide. Debe de estar todo bien registrado en la aplicación root.

## Registrar Microfronts

En nuestro archivo index registramos los microfronts que consideremos necesarios.

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { registerApplication, LifeCycles, start } from "single-spa";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

registerApplication({
  name: "app-angular",
  app: (): Promise<LifeCycles> =>
    (window as any).System.import("http://localhost:4200/main.js"),
  activeWhen: "/angular",
});

registerApplication({
  name: "app-react",
  app: (): Promise<LifeCycles> =>
    (window as any).System.import("@single-spa-test/app-react"),
  activeWhen: "/react",
});

start();
```

Todo esto lo podemos al final hacer super parametrizado y es lo que se le puede agregar para después. Que sería registrar las aplicaciones con un ciclo y ponerlas como script igual con un ciclo
