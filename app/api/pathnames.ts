const base = process.env.VERCEL_ENV === "production" ? "" : "staging";

export function getPathname(pathname: string) {
  return base + (pathname.startsWith("/") ? pathname : `/${pathname}`);
}

export function getRolesPathname() {
  return getPathname("/roles");
}

export function getRolesImagePathname(image: string) {
  return getPathname(`/roles/${image}`);
}

export function getTranslationsPathname(locale: string) {
  return getPathname(`/translations/${locale}`);
}

export function getVersionPathname(pathname: string) {
  return `${pathname}/version`;
}
