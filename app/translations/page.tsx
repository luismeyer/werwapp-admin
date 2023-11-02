import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { TranslationTab } from "@/components/translation-tab";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const LOCALES = ["de", "en"];

export default async function Translations() {
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
          <TabsContent className="mt-4" key={locale} value={locale}>
            <Suspense
              fallback={
                <div className="flex justify-center">
                  <Spinner size={50} />
                </div>
              }
            >
              <TranslationTab locale={locale} />
            </Suspense>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
