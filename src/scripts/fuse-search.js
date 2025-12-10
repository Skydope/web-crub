import Fuse from "fuse.js";

export function createFuse(data) {
  return new Fuse(data, {
    keys: ["titulo", "descripcion", "categoria", "content", "imagen", "url"],
    threshold: 0.35,
  });
}
