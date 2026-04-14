import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/session-provider"; // Onde criamos o SessionProvider
import "./globals.css";

export const metadata: Metadata = {
  title: "PCP - Trilha de Implantação | Satiro Consultoria",
  description: "Sistema de Gestão Industrial e Manufatura Enxuta",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      {/* Dica Sênior: 'antialiased' no body deixa as fontes mais 
          limpas, combinando com o visual industrial que estamos criando.
      */}
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <Header />
          
          {/* O 'children' é onde as páginas aparecem */}
          <main className="max-w-[1000px] mx-auto px-8 py-6 w-full flex-1">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}