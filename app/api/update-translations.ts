"use server";

import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { getTranslationsPathname } from "./pathnames";

export async function updateTranslations(
  locale: string,
  translations: Record<string, string>
) {
  const session = await getServerSession();

  if (!session?.user) {
    return;
  }

  await put(
    getTranslationsPathname(locale),
    JSON.stringify(translations, null, 2),
    {
      access: "public",
      addRandomSuffix: false,
      cacheControlMaxAge: 0,
    }
  );

  revalidatePath("/translations");
  revalidatePath("/api/translations");
}
