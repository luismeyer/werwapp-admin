import { getRoles } from "../get-roles";

export async function GET(_request: Request) {
  const roles = await getRoles();
  return Response.json(roles);
}
