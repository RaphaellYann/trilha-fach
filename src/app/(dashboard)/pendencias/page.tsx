"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import { TRILHA_STAGES, WHO_LBL } from "@/lib/data";
import { getAllTaskStatuses } from "@/lib/actions/trilha.actions"

export default function PendenciasPage() {
  const [filterWho, setFilterWho] = useState<string>("all");
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadData() {
      const savedStatuses = await getAllTaskStatuses();
      setCheckedTasks(savedStatuses);
    }
    loadData();
  }, []);

  const pendingTasks = TRILHA_STAGES.flatMap(stage => 
    stage.tasks
      .filter(task => !checkedTasks[task.id]) 
      .filter(task => filterWho === "all" || task.w === filterWho)
      .map(task => ({ ...task, stageName: stage.name, stageId: stage.id }))
  );

  return (
    <div className="max-w-5xl mx-auto w-full pt-8 pb-16">
      
      {/* Cabeçalho Topo (Imagem 2) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-medium text-[var(--brand-dark)] uppercase leading-none mt-1 mb-2 tracking-tighter">
  CONTROLE DE<br />PENDÊNCIAS
</h1>

        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex flex-col gap-1 w-full md:w-48">
            <label className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest">Consultor</label>
            <input type="text" value="Eduardo Satiro Elias" readOnly className="bg-[var(--surface-2)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--text-2)] w-full outline-none" />
          </div>
          <div className="flex flex-col gap-1 w-full md:w-36">
            <label className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest">Data de Início</label>
            <input type="text" value="14 / 04 / 2026" readOnly className="bg-[var(--surface-2)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--text-2)] w-full outline-none" />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-black text-[var(--brand-dark)] tracking-tight">Controle de Pendências</h2>
        <p className="text-sm text-[var(--text-2)] mt-1">Acompanhe e filtre os itens não concluídos (sem check) da Trilha de Implantação.</p>
      </div>

      {/* Barra de Filtro */}
      <div className="bg-[var(--surface-2)] border border-[var(--border)] p-4 rounded-lg flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <label className="text-[13px] font-bold text-[var(--text-2)] uppercase tracking-wider">Filtrar tarefas por responsável:</label>
        <select 
          value={filterWho}
          onChange={(e) => setFilterWho(e.target.value)}
          className="border border-[var(--border)] rounded-md px-4 py-2.5 text-[14px] text-[var(--text)] bg-white outline-none focus:border-[var(--primary)] min-w-[280px] cursor-pointer"
        >
          <option value="all">Ver Todas as Pendências</option>
          <option value="c">Carmen </option>
          <option value="d">Daiane </option>
          <option value="y">Yuri </option>
          <option value="eq">Equipe Completa</option>
        </select>
      </div>

      {/* Lista de Tarefas */}
      <div className="flex flex-col gap-3">
        {pendingTasks.length === 0 ? (
          <div className="text-center p-12 border-2 border-dashed border-[var(--border)] rounded-lg text-[var(--text-3)] bg-[var(--surface-2)]">
            🎉 Nenhuma pendência encontrada. Tudo em dia!
          </div>
        ) : (
          pendingTasks.map(task => (
            <div key={task.id} className="bg-white border border-[var(--border)] rounded-lg p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 transition-all hover:border-[var(--primary-border)] hover:shadow-sm">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest">
                  Etapa {task.stageId}: {task.stageName}
                </span>
                <span className="text-[14px] font-medium text-[var(--text)] leading-snug">
                  {task.t}
                </span>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${
                  task.w === 'c' ? 'bg-[#EEEDFE] text-[#5B50D6] border-[#5B50D6]/20' : 
                  task.w === 'd' ? 'bg-[#E6F1FB] text-[#2A71AA] border-[#2A71AA]/20' : 
                  task.w === 'y' ? 'bg-[#FAEEDA] text-[#B95232] border-[#B95232]/20' : 
                  'bg-[var(--surface-3)] text-[var(--text-2)] border-[var(--border)]'
                }`}>
                  {WHO_LBL[task.w as keyof typeof WHO_LBL]}
                </span>

                <Link 
                  href={`/trilha#${task.id}`} 
                  className="text-[10px] font-bold text-[var(--primary-text)] bg-[var(--primary-dim)] border border-[var(--primary-border)] px-4 py-2 rounded transition-colors hover:bg-[var(--primary)] hover:text-white uppercase tracking-widest"
                >
                  Ver na Trilha ➔
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}