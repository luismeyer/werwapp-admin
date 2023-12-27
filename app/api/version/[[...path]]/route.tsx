import { getVersion } from "../../get-version";
import { getPathname } from "../../pathnames";

type Params = { params: { path: string[] } };

export async function GET(_request: Request, { params: { path } }: Params) {
  const pathname = getPathname(path.join("/"));
  const data = await getVersion(pathname);

  return Response.json(data);
}
