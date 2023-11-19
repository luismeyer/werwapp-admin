const base = process.env.VERCEL_ENV === "production" ? "" : "staging";

export function getRolesPathname() {
  return base + "/roles.json";
}

export function getRolesImagePathname(image: string) {
  return base + `/roles/${image}`;
}

export function getTranslationsPathname(locale: string) {
  return base + `/translations/${locale}.json`;
}
