"use server";

import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { RoleDef } from "./roles";

export async function updateRoles(roles: RoleDef[]) {
  const session = await getServerSession();

  if (!session?.user) {
    return;
  }

  await put("roles.json", JSON.stringify({ roles }, null, 2), {
    access: "public",
    addRandomSuffix: false,
    cacheControlMaxAge: 0,
  });

  revalidatePath("/roles");
}
