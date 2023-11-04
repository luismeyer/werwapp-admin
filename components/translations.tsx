"use client";

import { useState } from "react";

import { TranslationForm } from "./translation-form";
import { TranslationTable } from "./translation-table";
import { Separator } from "./ui/separator";

type TranslationsProps = {
  locale: string;
  data: Record<string, string>;
};

export function Translations({ data, locale }: TranslationsProps) {
  const [newTranslations, setNewTranslations] = useState<
    Record<string, string>
  >({});

  return (
    <div className="grid">
      <TranslationForm
        onSubmit={(key, value) =>
          setNewTranslations((prev) => ({ ...prev, [key]: value }))
        }
      />

      <Separator className="my-12" />

      <TranslationTable
        data={data}
        locale={locale}
        newTranslations={newTranslations}
      />
    </div>
  );
}
