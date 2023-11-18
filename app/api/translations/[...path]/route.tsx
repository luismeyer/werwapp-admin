import { getTranslations } from "../../get-translations";
import { isUnauthorized, unauthorized } from "../../werwapp-auth";

export async function GET(
  request: Request,
  {
    params: {
      path: [locale],
    },
  }: { params: { path: [string, string] } }
) {
  if (isUnauthorized(request)) {
    return unauthorized();
  }

  const blob = await getTranslations(locale);
  return Response.json(blob);
}
