const BASE = "/Subix";

export function asset(path: string) {
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}
