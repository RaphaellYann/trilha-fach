import { getUsers } from "@/lib/actions/user.actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserManagementClient from "@/components/UserManagementClient";

export default async function AdminUsuariosPage() {
  const session = await auth();

  // Bloqueio de Sênior: Validação de camada de servidor
  if (!session?.user || !(session.user as any).isAdmin) {
    redirect("/trilha");
  }

  const users = await getUsers();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-black text-[var(--brand-dark)] uppercase tracking-tighter mb-8">
        Gestão de Usuários
      </h1>

      {/* Toda a inteligência de UI (Tabela, Modal, Editar, Criar) foi isolada no Cliente */}
      <UserManagementClient initialUsers={users} />
    </div>
  );
}