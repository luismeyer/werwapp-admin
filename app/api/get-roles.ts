import { getBlobUrl } from "./get-blob-url";

export async function getRoles() {
  return fetch(getBlobUrl("roles.json"), {
    next: { revalidate: false },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return {};
    });
}
