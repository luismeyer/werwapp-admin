import { isUnauthorized, unauthorized } from "./app/api/werwapp-auth";

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (isUnauthorized(request)) {
    return unauthorized();
  }
}

export const config = {
  matcher: "/api/:path*",
};
