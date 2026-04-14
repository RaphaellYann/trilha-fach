// src/middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

// Criamos uma instância dedicada ao Edge (sem Prisma)
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const isAuthPage = nextUrl.pathname === "/login";

  // 1. Se logado no login -> vai para trilha
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/trilha", nextUrl));
  }

  // 2. Se não logado e não é login -> vai para login
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 3. Proteção de Admin
  if (nextUrl.pathname.startsWith("/admin") && !(session?.user as any)?.isAdmin) {
    return NextResponse.redirect(new URL("/trilha", nextUrl));
  }

  return NextResponse.next();
});

// MATCHER SÊNIOR: Não deixa o middleware rodar em lixo (imagens, ícones, etc)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};