import { getTranslations } from "../../get-translations";

type Params = { params: { locale: string } };

export async function GET(_request: Request, { params: { locale } }: Params) {
  const data = await getTranslations(locale);
  return Response.json(data);
}
