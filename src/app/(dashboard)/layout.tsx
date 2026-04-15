import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Satiro Consultoria",
    template: "%s", 
  },
  description: "Painel de Controle PCP",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}