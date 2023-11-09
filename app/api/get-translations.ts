"use server";

import { getBlobUrl } from "./get-blob-url";

export async function getPathname(locale: string) {
  return `translations/${locale}.json`;
}

export async function getTranslations(locale: string) {
  const pathname = await getPathname(locale);
  const url = getBlobUrl(pathname);

  return fetch(url)
    .then((res): Promise<Record<string, string>> => res.json())
    .catch((error) => {
      console.log(error);
      return {};
    });
}
