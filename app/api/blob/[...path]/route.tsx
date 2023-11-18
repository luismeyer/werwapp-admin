import { getRoles } from "../../get-roles";
import { getTranslations } from "../../get-translations";

export const dynamic = "force-static";

export async function GET(
  _request: Request,
  {
    params: {
      path: [firstSegment, secondSegment],
    },
  }: { params: { path: [string, string] } }
) {
  if (firstSegment === "translations") {
    const blob = await getTranslations(secondSegment);
    return Response.json(blob);
  }

  if (firstSegment === "roles") {
    const blob = await getRoles();
    return Response.json(blob);
  }

  return Response.json({ error: "No json" }, { status: 400 });
}
