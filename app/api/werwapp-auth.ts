const { WERWAPP_SECRET } = process.env;

if (!WERWAPP_SECRET) {
  throw new Error("No WERWAPP_SECRET env var");
}

export function isUnauthorized(request: Request) {
  return request.headers.get("authorization") !== `Bearer ${WERWAPP_SECRET}`;
}

export function unauthorized() {
  return Response.json({ msg: "unauthed" }, { status: 401 });
}
