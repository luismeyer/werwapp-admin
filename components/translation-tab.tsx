import { getTranslations } from "@/app/api/get-translations";

import { Translations } from "./translations";

type TranslationTabProps = {
  locale: string;
};

export async function TranslationTab({ locale }: TranslationTabProps) {
  const translations = await getTranslations(locale);

  return <Translations data={translations} locale={locale} />;
}
