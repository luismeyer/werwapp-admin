import { getRoles } from "../get-roles";
import { isUnauthorized, unauthorized } from "../werwapp-auth";

export async function GET(request: Request) {
  if (isUnauthorized(request)) {
    return unauthorized();
  }

  const roles = await getRoles();
  return Response.json(roles);
}
