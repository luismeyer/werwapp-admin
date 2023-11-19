import { getBlobUrl } from "./get-blob-url";
import { getRolesPathname } from "./pathnames";

export async function getRoles() {
  const url = getBlobUrl(getRolesPathname());

  return fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return {};
    });
}
