import { getUsers, createUser } from "@/lib/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminUsuariosPage() {
  const session = await auth();

  // Bloqueio de Sênior: Se não for admin, tchau.
  if (!session?.user || !(session.user as any).isAdmin) {
    redirect("/trilha");
  }

  const users = await getUsers();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-black text-[var(--brand-dark)] uppercase tracking-tighter mb-8">
        Gestão de Usuários
      </h1>

      {/* Formulário de Criação */}
      <div className="bg-white border border-[var(--border)] p-6 rounded-lg shadow-sm mb-10">
        <h2 className="font-bold text-[var(--text)] mb-4 uppercase text-xs tracking-widest">Cadastrar Novo Usuário</h2>
        <form action={createUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" placeholder="Nome Completo" className="border p-2 rounded text-sm outline-none focus:border-[var(--primary)]" required />
          <input name="email" type="email" placeholder="E-mail" className="border p-2 rounded text-sm outline-none focus:border-[var(--primary)]" required />
          <input name="password" type="password" placeholder="Senha Inicial" className="border p-2 rounded text-sm outline-none focus:border-[var(--primary)]" required />
          <select name="isAdmin" className="border p-2 rounded text-sm outline-none focus:border-[var(--primary)]">
            <option value="false">Usuário Padrão</option>
            <option value="true">Administrador</option>
          </select>
          <button type="submit" className="md:col-span-2 bg-[var(--primary)] text-white font-bold py-2 rounded uppercase text-xs tracking-widest hover:opacity-90 transition-opacity">
            Criar Usuário
          </button>
        </form>
      </div>

      {/* Tabela de Usuários */}
      <div className="bg-white border border-[var(--border)] rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--surface-2)] border-b border-[var(--border)] text-[var(--text-3)] uppercase text-[10px] font-bold">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Perfil</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-[var(--text)]">{user.name}</td>
                <td className="px-4 py-3 text-[var(--text-2)]">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${user.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                    {user.isAdmin ? 'Admin' : 'Equipe'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}