import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { TranslationTab } from "@/components/translation-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LOCALES = ["de", "en"];

export default async function TranslationsPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="grid">
      <Tabs defaultValue={LOCALES[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          {LOCALES.map((locale) => (
            <TabsTrigger key={locale} value={locale}>
              {locale}
            </TabsTrigger>
          ))}
        </TabsList>

        {LOCALES.map((locale) => (
          <TabsContent className="grid m-0" key={locale} value={locale}>
            <div className="mt-4">
              <Suspense>
                <TranslationTab locale={locale} />
              </Suspense>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
