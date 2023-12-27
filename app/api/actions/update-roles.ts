"use server";

import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { RoleDefRecord } from "../roles";
import { getRolesPathname } from "../pathnames";
import { kv } from "@vercel/kv";
import { updateVersion } from "../update-version";
import { RolesCacheTag } from "../cache";

export async function updateRoles(roles: RoleDefRecord) {
  const session = await getServerSession();

  if (!session?.user) {
    return;
  }

  const pathname = getRolesPathname();

  await kv.json.set(pathname, "$", roles);

  await updateVersion(pathname);

  revalidatePath("/roles");

  revalidateTag(RolesCacheTag);
}
