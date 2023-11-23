import { getTranslations } from "@/app/api/get-translations";

import { Translations } from "./translations";
import { getVersion } from "@/app/api/get-version";
import { getTranslationsPathname } from "@/app/api/pathnames";

type TranslationTabProps = {
  locale: string;
};

export async function TranslationTab({ locale }: TranslationTabProps) {
  const translations = await getTranslations(locale);

  const pathname = getTranslationsPathname(locale);

  return <Translations data={translations} locale={locale} />;
}
