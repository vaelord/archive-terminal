// Compatibility layer. Edit manifest.json; Vite imports it as the site source of truth.
import data from "./manifest.json";
export const manifest = data;
