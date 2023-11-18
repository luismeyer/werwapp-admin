import { getBlobUrl } from "./get-blob-url";

export function getPathname(locale: string) {
  return `translations/${locale}.json`;
}

export async function getTranslations(locale: string) {
  const pathname = getPathname(locale);
  const url = getBlobUrl(pathname);

  return fetch(url, { next: { revalidate: false } })
    .then((res): Promise<Record<string, string>> => res.json())
    .catch((error) => {
      console.log(error);
      return {};
    });
}
