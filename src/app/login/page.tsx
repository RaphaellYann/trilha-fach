"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  // PROTEÇÃO EXTRA: Se a sessão carregar e o usuário já estiver logado, foge daqui
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
      redirect: false, // Mantemos false para tratar o erro aqui
    });

    if (result?.error) {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
    } else {
      // O SEGREDO: window.location força o Next.js a ler a sessão do servidor do zero
      // Isso mata o bug do botão travado e do header dessincronizado
      window.location.href = "/trilha";
    }
  };

  if (status === "authenticated") return null;

  return (
    <div className="min-h-screen flex items-start justify-center bg-[var(--surface-2)] pt-20 px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-[var(--border)] w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest">Satiro Consultoria</span>
          <h2 className="text-3xl font-black text-[var(--brand-dark)] uppercase tracking-tighter mt-1">Acesso Restrito</h2>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-6 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest">E-mail</label>
            <input 
              type="email" 
              required
              disabled={loading}
              className="border border-[var(--border)] rounded px-4 py-2.5 outline-none focus:border-[var(--primary)] disabled:opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest">Senha</label>
            <input 
              type="password" 
              required
              disabled={loading}
              className="border border-[var(--border)] rounded px-4 py-2.5 outline-none focus:border-[var(--primary)] disabled:opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="bg-[var(--brand-dark)] text-white font-bold uppercase tracking-widest py-3 rounded mt-4 hover:bg-[var(--primary)] transition-colors disabled:opacity-50"
          >
            {loading ? "VERIFICANDO..." : "ENTRAR NO SISTEMA"}
          </button>
        </form>
      </div>
    </div>
  );
}