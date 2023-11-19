import { getBlobUrl } from "./get-blob-url";
import { getTranslationsPathname } from "./pathnames";

export async function getTranslations(locale: string) {
  const pathname = getTranslationsPathname(locale);
  const url = getBlobUrl(pathname);

  return fetch(url)
    .then((res): Promise<Record<string, string>> => res.json())
    .catch((error) => {
      console.log(error);
      return {};
    });
}
