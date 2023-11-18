import { getBlobUrl } from "@/app/api/get-blob-url";
import { RoleDefRecordSchema } from "@/app/api/roles";
import { RolesList } from "./roles-list";

export async function RolesData() {
  const data = await fetch(getBlobUrl("roles.json"), {
    next: { revalidate: false },
  }).then((res) => res.json());

  const roles = RoleDefRecordSchema.parse(data);

  return (
    <div>
      <RolesList roles={roles} />
    </div>
  );
}
