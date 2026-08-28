const BASE = process.env.NODE_ENV === 'production' ? '/Subix' : '';

export function asset(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (BASE && cleanPath.startsWith(`${BASE}/`)) {
    return cleanPath;
  }
  return `${BASE}${cleanPath}`;
}
