import { auth } from "@/auth"; // Ajuste o caminho se moveu o arquivo
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const isAuthPage = nextUrl.pathname === "/login";

  // REGRA NOVA: Se já está logado e tentar ir para o /login, manda para a trilha
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/trilha", nextUrl));
  }

  // Se não estiver logado e tentar acessar rotas protegidas
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Proteção de Admin
  if (nextUrl.pathname.startsWith("/admin") && !(session?.user as any)?.isAdmin) {
    return NextResponse.redirect(new URL("/trilha", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/trilha/:path*", "/pendencias/:path*", "/pilares/:path*", "/admin/:path*", "/login"],
};