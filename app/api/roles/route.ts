import { getRoles } from "../get-roles";
import { isUnauthorized, unauthorized } from "../werwapp-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (isUnauthorized(request)) {
    return unauthorized();
  }

  const blob = await getRoles();
  return Response.json(blob);
}
