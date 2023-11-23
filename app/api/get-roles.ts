import { kv } from "@vercel/kv";
import { getRolesPathname } from "./pathnames";

export async function getRoles() {
  return kv.json.get(getRolesPathname());
}
