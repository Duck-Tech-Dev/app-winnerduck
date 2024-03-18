import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { APIService } from "./services/api";

export const config = {
  matcher: "/panel/:path*",
};

const authPage = "/panel/auth";

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === authPage) {
    return NextResponse.next();
  }
  const isAuthenticated = await validateToken(req.cookies.getAll());
  if (isAuthenticated) {
    return NextResponse.next();
  }
  const redirectUrl = new URL(authPage, req.url);
  return NextResponse.redirect(redirectUrl);
}

const validateToken = async (allCookies: any) => {
  const response = await fetch(`${APIService.baseURL}/auth/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cookies:  allCookies}),
  });
  return response.ok;
}
