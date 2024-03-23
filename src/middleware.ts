import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { APIService } from "./services/api";

export const config = {
  matcher: "/panel/:path*",
};

const authPage = "/panel/auth";
const panelPage = "/panel";

export default async function middleware(req: NextRequest) {
  const isAuthenticated = await validateToken(req.cookies.getAll());
  if (req.nextUrl.pathname === authPage) {
    if (isAuthenticated) {
      const panelRedirectUrl = new URL(panelPage, req.url);
      return NextResponse.redirect(panelRedirectUrl);
    }
    return NextResponse.next();
  }
  if (isAuthenticated) {
    return NextResponse.next();
  }
  const authRedirectUrl = new URL(authPage, req.url);
  return NextResponse.redirect(authRedirectUrl);
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
