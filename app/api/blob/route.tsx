export async function GET(request: Request) {
  const url = new URL(request.url);

  const blob = url.searchParams.get("url");

  if (!blob) {
    return Response.json({ error: "No blob URL provided" }, { status: 400 });
  }

  return Response.json(await fetch(blob).then((res) => res.json()));
}
