import { isUnauthorized, unauthorized } from "../../werwapp-auth";
import { getVersion } from "../../get-version";
import { getPathname } from "../../pathnames";

type Params = { params: { path: string[] } };

export async function GET(request: Request, { params: { path } }: Params) {
  if (isUnauthorized(request)) {
    return unauthorized();
  }

  const pathname = getPathname(path.join("/"));
  const data = await getVersion(pathname);

  return Response.json(data);
}
