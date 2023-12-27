import { RoleDefRecordSchema } from "@/app/api/roles";
import { RolesList } from "./roles-list";
import { getRoles } from "@/app/api/get-roles";

export async function RolesData() {
  const data = await getRoles();

  const roles = RoleDefRecordSchema.parse(data);

  return <RolesList roles={roles} />;
}
