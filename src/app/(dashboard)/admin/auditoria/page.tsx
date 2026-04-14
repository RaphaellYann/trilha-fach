import { getAuditLogs } from "@/lib/actions/audit.actions";
import { format } from "date-fns"; 
import { ptBR } from "date-fns/locale";
import Link from "next/link";

export default async function AuditoriaPage() {
  const logs = await getAuditLogs();

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-2xl font-black uppercase tracking-tighter mb-6 text-[var(--brand-dark)]">
        Registro de Auditoria
      </h1>

      <div className="bg-white border border-[var(--border)] rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--surface-2)] text-[var(--text-3)] font-bold uppercase text-[10px]">
            <tr>
              <th className="px-4 py-3">Data/Hora</th>
              <th className="px-4 py-3">Usuário</th>
              <th className="px-4 py-3">Tarefa ID</th>
              <th className="px-4 py-3">Ação</th>
              <th className="px-4 py-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400 italic">
                  Nenhum registro de atividade encontrado.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-[var(--text-2)]">
                    {/* Correção aqui: new Date() */}
                    {format(new Date(log.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                  </td>
                  <td className="px-4 py-3 font-bold text-[var(--text)]">
                    {log.user.name}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-3)] font-mono text-xs">
                    #{log.taskId}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                      log.action === "CHECK" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {log.action === "CHECK" ? "Concluiu" : "Desmarcou"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link 
                      href={`/trilha#${log.taskId}`}
                      className="text-[10px] font-bold text-[var(--primary)] uppercase hover:underline"
                    >
                      Ver Tarefa ➔
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}