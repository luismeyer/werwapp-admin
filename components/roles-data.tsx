import { getBlobUrl } from "@/app/api/get-blob-url";
import { RoleDefResponseSchema } from "@/app/api/roles";
import { RolesList } from "./roles-list";

export async function RolesData() {
  const data = await fetch(getBlobUrl("roles.json")).then((res) => res.json());

  const { roles } = RoleDefResponseSchema.parse(data);

  return (
    <div>
      <RolesList roles={roles} />
    </div>
  );
}
