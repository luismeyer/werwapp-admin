import { getTranslations } from "../../get-translations";
import { isUnauthorized, unauthorized } from "../../werwapp-auth";

type Params = { params: { locale: string } };

export async function GET(request: Request, { params: { locale } }: Params) {
  if (isUnauthorized(request)) {
    return unauthorized();
  }

  const data = await getTranslations(locale);
  return Response.json(data);
}
