import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

// Instância leve que não carrega o Prisma
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const isAuthPage = nextUrl.pathname === "/login";

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/trilha", nextUrl));
  }

  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (nextUrl.pathname.startsWith("/admin") && !(session?.user as any)?.isAdmin) {
    return NextResponse.redirect(new URL("/trilha", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/trilha/:path*", "/pendencias/:path*", "/pilares/:path*", "/admin/:path*", "/login"],
};