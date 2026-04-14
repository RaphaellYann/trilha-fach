import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/password";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // Se o usuário não existe ou a senha está incorreta, retornamos null
        if (!user || !(await comparePassword(credentials.password as string, user.password))) {
          return null;
        }

        // Retornamos apenas o necessário para criar o token inicial
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  callbacks: {
    // O JWT é executado no SERVIDOR. O usuário não consegue ler nem alterar via F12.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = (user as any).isAdmin;
      }
      return token;
    },
    // A SESSION é o que o navegador recebe. Enviamos apenas o ID e o Papel (Admin).
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Mais seguro e performático para Next.js
    maxAge: 30 * 24 * 60 * 60, // 30 dias de sessão
  },
  pages: {
    signIn: "/login", // Redireciona para sua página customizada
  },
  // Proteção extra: cookies seguros e nomes de cookies prefixados em produção
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
      options: {
        httpOnly: true, // Impede que scripts (F12) acessem o cookie
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production", // Apenas via HTTPS em produção
      },
    },
  },
});