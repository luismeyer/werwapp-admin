"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { getTranslationsPathname } from "../pathnames";
import { kv } from "@vercel/kv";
import { updateVersion } from "../update-version";

export async function updateTranslations(
  locale: string,
  translations: Record<string, string>
) {
  const session = await getServerSession();

  if (!session?.user) {
    return;
  }

  const pathname = getTranslationsPathname(locale);

  await kv.json.set(pathname, "$", translations);

  await updateVersion(pathname);

  revalidatePath("/version");
  revalidatePath("/translations");
  revalidatePath("/api/translations");
}
