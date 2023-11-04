import { getTranslations } from "../get-translations";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const locale = url.searchParams.get("locale");

  if (!locale) {
    return Response.json({ error: "No locale provided" }, { status: 400 });
  }

  const blob = await getTranslations(locale);

  return Response.json(blob);
}
