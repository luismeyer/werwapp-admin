import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { list, put } from "@vercel/blob";

export default async function Translations() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  const { blobs } = await list({
    prefix: "translations/",
  });

  const translations = await Promise.all(
    blobs.map((locale) =>
      fetch(locale.url)
        .then((res): Promise<Record<string, string>> => res.json())
        .catch(() => ({}))
    )
  );

  return (
    <main className="grid">
      <Tabs defaultValue={blobs[0].pathname} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          {blobs.map((locale) => (
            <TabsTrigger key={locale.pathname} value={locale.pathname}>
              {locale.pathname}
            </TabsTrigger>
          ))}
        </TabsList>

        {translations.map((locale, index) => (
          <TabsContent
            key={blobs[index].pathname}
            value={blobs[index].pathname}
          >
            {JSON.stringify(locale, null, 4)}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
