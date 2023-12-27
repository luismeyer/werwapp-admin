import { unstable_cache } from "next/cache";
import { getTranslations } from "../../get-translations";

export const dynamic = "force-dynamic";

type Params = { params: { locale: string } };

export async function GET(_request: Request, { params: { locale } }: Params) {
  const loadCache = unstable_cache(
    () => getTranslations(locale),
    ["locale", locale],
    { tags: ["translations"] }
  );

  const data = await loadCache();
  return Response.json(data);
}
