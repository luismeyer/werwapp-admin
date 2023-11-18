import { getBlobUrl } from "./get-blob-url";

export async function getRoles() {
  return fetch(getBlobUrl("roles.json"))
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return {};
    });
}
