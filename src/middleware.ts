// src/middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

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

// MATCHER SÊNIOR: Ignora explicitamente arquivos estáticos e pastas de sistema
export const config = {
  matcher: [
    /*
     * Ignora: api/auth, _next/static, _next/image, favicon.ico, public assets
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    // Mantém as rotas que queremos proteger
    "/trilha/:path*", 
    "/pendencias/:path*", 
    "/pilares/:path*", 
    "/admin/:path*", 
    "/login"
  ],
};