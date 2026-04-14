"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const tabs = [
    { href: "/trilha", label: "📄 Trilha de Implantação" },
    { href: "/pilares", label: "📚 Pilares do PCP" },
    { href: "/pendencias", label: "⚠️ Controle de Pendências" },
  ];

  return (
    <header className="w-full shadow-md">
      {/* Topo Escuro (Branding e Gestão) */}
      <div className="bg-[#141434] text-white py-3 px-4 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo Clicável */}
          <Link 
            href="/trilha" 
            className="flex flex-col items-center md:items-start gap-1 group transition-all"
          >
            <div className="relative w-48 h-10 md:w-56 md:h-12 group-hover:opacity-80 transition-opacity">
              <Image
                src="/images/logo1.png"
                alt="Logo Satiro Consultoria"
                fill
                className="object-contain object-center md:object-left"
                priority
              />
            </div>
            <p className="text-[8px] md:text-[9px] text-gray-400 uppercase tracking-[0.2em] font-medium text-center md:text-left leading-none mt-1 group-hover:text-gray-300">
              Implantação de PPCP · Lean Manufacturing · Gestão da Produção
            </p>
          </Link>

          {/* Área de Sessão / Usuário */}
          <div className="flex items-center gap-6 border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
            <div className="flex items-center gap-4 text-center md:text-right">
              
              {status === "loading" ? (
                <div className="text-[10px] text-gray-500 animate-pulse uppercase font-bold tracking-widest">
                  Verificando...
                </div>
              ) : session ? (
                /* ESTADO: LOGADO */
                <div className="flex items-center gap-4">
                  <div className="hidden md:block">
                    <div className="text-xs font-bold tracking-tight text-white uppercase">
                      {session.user?.name}
                    </div>
                    {(session.user as any)?.isAdmin && (
                      <div className="flex gap-2 mt-1 justify-end">
                        <Link 
                          href="/admin/usuarios" 
                          className={`text-[8px] px-2 py-0.5 rounded font-black uppercase transition-all ${
                            pathname === "/admin/usuarios" 
                              ? "bg-[var(--primary)] text-white" 
                              : "bg-white/5 text-gray-400 hover:bg-white/10"
                          }`}
                        >
                          Usuários
                        </Link>
                        <Link 
                          href="/admin/auditoria" 
                          className={`text-[8px] px-2 py-0.5 rounded font-black uppercase transition-all ${
                            pathname === "/admin/auditoria" 
                              ? "bg-[var(--primary)] text-white" 
                              : "bg-white/5 text-gray-400 hover:bg-white/10"
                          }`}
                        >
                          Auditoria
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Botão de Sair Estilizado */}
                  <button 
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-2 px-3 py-1.5 border border-white/20 rounded-md bg-white/5 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all text-[10px] font-black uppercase tracking-widest group"
                  >
                    Sair 
                    <span className="opacity-50 group-hover:opacity-100">✕</span>
                  </button>
                </div>
              ) : (
                /* ESTADO: DESLOGADO */
                <Link 
                  href="/login" 
                  className="bg-[var(--primary)] text-white px-5 py-2 rounded font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
                >
                  Acessar Sistema
                </Link>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Navegação Principal */}
      <nav className="bg-white border-b-2 border-[var(--primary)] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex gap-2 md:gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`py-4 px-2 text-[11px] md:text-xs font-black uppercase tracking-widest transition-all border-b-4 -mb-[2px] whitespace-nowrap flex items-center gap-2
                  ${isActive
                    ? "text-[var(--primary)] border-[var(--primary)] bg-orange-50/50"
                    : "text-slate-500 border-transparent hover:text-[var(--primary)] hover:bg-slate-50"
                  }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}