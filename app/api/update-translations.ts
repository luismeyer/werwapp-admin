"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function updateTranslations(
  pathname: string,
  translations: Record<string, string>
) {
  await put(pathname, JSON.stringify(translations, null, 2), {
    access: "public",
    addRandomSuffix: false,
    cacheControlMaxAge: 0,
  });

  revalidatePath("/translations");
}
