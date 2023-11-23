import { kv } from "@vercel/kv";

import { getVersionPathname } from "./pathnames";

export async function updateVersion(pathname: string) {
  const versionPathname = getVersionPathname(pathname);

  console.log(versionPathname);
  await kv.set(versionPathname, Date.now());
}
