"use server";

const [, , , blobStoreId] = process.env.BLOB_READ_WRITE_TOKEN?.split("_") ?? [];

export async function getPathname(locale: string) {
  return `translations/${locale}.json`;
}

export async function getTranslations(locale: string) {
  const pathname = await getPathname(locale);
  const url = `https://${blobStoreId}.public.blob.vercel-storage.com/${pathname}`;

  return fetch(url)
    .then((res): Promise<Record<string, string>> => res.json())
    .catch((error) => {
      console.log(error);
      return {};
    });
}
