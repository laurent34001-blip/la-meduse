import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated =
    request.cookies.has("_medusa_jwt") ||
    request.cookies.has("connect.sid") ||
    request.cookies.has("medusa_customer_session");

  if (!isAuthenticated) {
    const loginUrl = new URL("/connexion", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/espace-pro"]
};
