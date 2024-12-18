import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/departmentss", "/dashboard"];

export default function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get("auth-token");
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
