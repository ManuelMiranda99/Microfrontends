export interface Page {
  label: string;
  name: string;
  appRoute: string;
  route: string;
}

export interface NewPage {
  label: string; // Para el label del boton del menu
  appRoute: string; // La ruta a la que debe de ir para que se muestre
  name: string; // El name que tiene esta ruta
  import: string; // La ruta que va del lado derecho del import
  htmlImport: string; // El nombre que tiene del lado izquierdo del import
  type: "REACT" | "ANGULAR";
}
