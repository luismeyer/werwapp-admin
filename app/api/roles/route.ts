import { unstable_cache } from "next/cache";
import { getRoles } from "../get-roles";
import { RolesCacheTag } from "../cache";

export const dynamic = "force-dynamic";

export async function GET(_request: Request) {
  const loadCache = unstable_cache(() => getRoles(), ["roles"], {
    tags: [RolesCacheTag],
  });

  const roles = await loadCache();
  return Response.json(roles);
}
