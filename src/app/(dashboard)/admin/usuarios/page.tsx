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
    // Reduzido py-10 para py-6 para subir o conteúdo e ajustado max-w para igualar a auditoria
    <div className="max-w-6xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-medium text-[var(--brand-dark)] uppercase tracking-tight mb-2">
                Gestão de Usuários
              </h1>

      {/* Toda a inteligência de UI (Tabela, Modal, Editar, Criar) foi isolada no Cliente */}
      <UserManagementClient initialUsers={users} />
    </div>
  );
}