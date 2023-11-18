"use server";

import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";

export async function uploadImage(form: FormData) {
  const name = form.get("name");
  const image = form.get("image");

  if (!name || !image) {
    return;
  }

  const session = await getServerSession();

  if (!session?.user) {
    return;
  }

  const { url } = await put(name.toString(), image, {
    access: "public",
    addRandomSuffix: false,
    cacheControlMaxAge: 0,
  });

  return url;
}
