import { kv } from "@vercel/kv";
import { getTranslationsPathname } from "./pathnames";

export async function getTranslations(
  locale: string
): Promise<Record<string, string>> {
  const pathname = getTranslationsPathname(locale);

  return kv.json.get(pathname);
}
