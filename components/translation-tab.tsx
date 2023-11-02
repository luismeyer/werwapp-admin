import { TranslationTable } from "./translation-table";

type TranslationTabProps = {
  locale: string;
};

const [, , , blobStoreId] = process.env.BLOB_READ_WRITE_TOKEN?.split("_") ?? [];

export async function TranslationTab({ locale }: TranslationTabProps) {
  const pathname = `translations/${locale}.json`;
  const url = `https://${blobStoreId}.public.blob.vercel-storage.com/${pathname}`;

  const translations = await fetch(url)
    .then((res): Promise<Record<string, string>> => res.json())
    .catch(() => ({}));

  return <TranslationTable data={translations} pathname={pathname} url={url} />;
}
