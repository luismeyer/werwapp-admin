import { kv } from "@vercel/kv";
import { getVersionPathname } from "./pathnames";

export async function getVersion(pathname: string) {
  const versionPath = getVersionPathname(pathname);
  return await kv.get<number>(versionPath);
}
