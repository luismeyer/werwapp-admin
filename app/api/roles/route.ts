import { getRoles } from "../get-roles";

export async function GET() {
  const blob = await getRoles();
  return Response.json(blob);
}
