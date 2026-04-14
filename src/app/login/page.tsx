"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/trilha");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
    } else {
      window.location.href = "/trilha";
    }
  };

  if (status === "authenticated") return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-2)] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-[var(--border)] w-full max-w-md">
        
        <div className="text-center mb-10">
          {/* Logo da Empresa */}
          <div className="flex justify-center mb-6">
            <Image 
              src="/images/logo3.png" 
              alt="Satiro Consultoria"
              width={220}
              height={60}
              className="object-contain"
              priority
            />
          </div>
          
          <h2 className="text-3xl font-black text-[var(--brand-dark)] uppercase tracking-tighter mt-2">
            Acesso Restrito
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700 text-xs font-bold animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-[var(--brand-dark)] uppercase tracking-widest ml-1">
              E-mail corporativo
            </label>
            <input 
              type="email" 
              required
              disabled={loading}
              placeholder="seu@email.com.br"
              className="border border-[var(--border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-dim)] transition-all bg-slate-50 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-[var(--brand-dark)] uppercase tracking-widest ml-1">
              Senha de acesso
            </label>
            <input 
              type="password" 
              required
              disabled={loading}
              placeholder="••••••••"
              className="border border-[var(--border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-dim)] transition-all bg-slate-50 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="bg-[var(--brand-dark)] text-white font-bold uppercase tracking-widest py-4 rounded-xl mt-4 hover:bg-[var(--primary)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-black/10 disabled:opacity-50 text-xs"
          >
            {loading ? "VERIFICANDO..." : "ENTRAR NO SISTEMA"}
          </button>
        </form>

        <p className="mt-8 text-center text-[9px] text-[var(--text-3)] uppercase tracking-widest font-bold">
          © 2026 Satiro Consultoria · Engenharia Industrial
        </p>
      </div>
    </div>
  );
}