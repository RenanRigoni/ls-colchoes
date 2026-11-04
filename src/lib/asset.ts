const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** next/image e <img> não aplicam basePath sozinhos em export estático: prefixar aqui. */
export function asset(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
