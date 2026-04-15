"use client";


import { useState, useEffect, useTransition } from "react";
import { TRILHA_STAGES, WHO_LBL } from "@/lib/data";
import { toggleTaskStatus, getAllTaskStatuses } from "@/lib/actions/trilha.actions";
import { getEvidencesStatus } from "@/lib/actions/evidence.actions";
import EditableResponsibilities from "@/components/EditableResponsibilities";
import EvidenceButton from "@/components/EvidenceButton";
import EvidenceView from "@/components/EvidenceView";

export default function TrilhaPage() {
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  // ESTADO NOVO: Guarda quais tarefas possuem anexos no banco
  const [evidenceMap, setEvidenceMap] = useState<Record<string, boolean>>({});
  
  const [expandedStages, setExpandedStages] = useState<Record<number, boolean>>({ 1: true });
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();
  const [highlightedTask, setHighlightedTask] = useState<string | null>(null);

  // Carrega os dados (Checks e Evidências) ao montar a tela
  useEffect(() => {
    async function loadData() {
      // Promise.all executa as duas buscas ao mesmo tempo para não travar a tela
      const [savedStatuses, evidences] = await Promise.all([
        getAllTaskStatuses(),
        getEvidencesStatus()
      ]);
      setCheckedTasks(savedStatuses);
      setEvidenceMap(evidences);
    }
    loadData();
  }, []);

  // Lógica de Scroll e Hash (Mantida idêntica)
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkHashAndApply = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return false;

      const stageId = parseInt(hash.split('-')[0], 10);
      if (isNaN(stageId)) return false;

      setExpandedStages(prev => ({ ...prev, [stageId]: true }));
      setHighlightedTask(hash);

      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);

      return true;
    };

    if (!checkHashAndApply()) {
      let attempts = 0;
      intervalId = setInterval(() => {
        if (checkHashAndApply() || attempts > 10) {
          clearInterval(intervalId);
        }
        attempts++;
      }, 100);
    }

    window.addEventListener("hashchange", checkHashAndApply);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("hashchange", checkHashAndApply);
    };
  }, []);

  // Action de Checkbox
  const toggleTask = (taskId: string) => {
    const currentStatus = checkedTasks[taskId] || false;
    setCheckedTasks((prev) => ({ ...prev, [taskId]: !currentStatus }));

    startTransition(async () => {
      const result = await toggleTaskStatus(taskId, currentStatus);
      if (!result.success) {
        setCheckedTasks((prev) => ({ ...prev, [taskId]: currentStatus }));
        alert("Erro ao salvar a tarefa no banco de dados.");
      }
    });
  };

  const toggleStage = (stageId: number) => setExpandedStages(prev => ({ ...prev, [stageId]: !prev[stageId] }));

  const toggleTaskDetails = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const totalTasks = TRILHA_STAGES.reduce((acc, stage) => acc + stage.tasks.length, 0);
  const completedTasks = Object.values(checkedTasks).filter(Boolean).length;
  const progressPct = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="max-w-5xl mx-auto w-full pt-8 pb-16">

      {/* CABEÇALHO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-medium text-[var(--brand-dark)] uppercase leading-none mt-1 mb-2 tracking-tighter">
            TRILHA DE<br />IMPLANTAÇÃO
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

      {/* PROGRESSO */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-bold text-[var(--text-3)] uppercase tracking-widest">Progresso geral da implantação</span>
          <span className={`text-4xl font-black ${progressPct === 100 ? 'text-[var(--green-text)]' : 'text-[var(--primary)]'}`}>
            {progressPct}%
          </span>
        </div>
        <div className="h-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-full overflow-hidden mb-2">
          <div className="h-full bg-[var(--primary)] transition-all duration-500" style={{ width: `${progressPct}%` }}></div>
        </div>
        <div className="text-xs text-[var(--text-2)] mb-6">{completedTasks} de {totalTasks} itens concluídos</div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[var(--border)] rounded-lg p-4 text-center shadow-sm">
            <span className="block text-3xl font-black text-[var(--green-text)]">{TRILHA_STAGES.filter(s => s.tasks.every(t => checkedTasks[t.id])).length}</span>
            <span className="text-[11px] text-[var(--text-2)] mt-1 uppercase tracking-wider font-semibold">Etapas concluídas</span>
          </div>
          <div className="bg-white border border-[var(--border)] rounded-lg p-4 text-center shadow-sm">
            <span className="block text-3xl font-black text-[var(--text)]">{TRILHA_STAGES.length}</span>
            <span className="text-[11px] text-[var(--text-2)] mt-1 uppercase tracking-wider font-semibold">Total de etapas</span>
          </div>
          <div className="bg-white border border-[var(--border)] rounded-lg p-4 text-center shadow-sm">
            <span className="block text-3xl font-black text-[var(--primary)]">{completedTasks}</span>
            <span className="text-[11px] text-[var(--text-2)] mt-1 uppercase tracking-wider font-semibold">Itens concluídos</span>
          </div>
          <div className="bg-white border border-[var(--border)] rounded-lg p-4 text-center shadow-sm">
            <span className="block text-3xl font-black text-[var(--text)]">{totalTasks}</span>
            <span className="text-[11px] text-[var(--text-2)] mt-1 uppercase tracking-wider font-semibold">Total de itens</span>
          </div>
        </div>
      </div>

      {/* LISTA DE ETAPAS */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-bold text-[var(--text-3)] uppercase tracking-widest">Etapas da implantação</span>
          <div className="flex-1 h-px bg-[var(--border)]"></div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6 text-[11px] text-[var(--text-2)]">
          <div className="flex items-center gap-2"><span className="px-2 py-0.5 rounded-full font-bold bg-[#EEEDFE] text-[#5B50D6]">Carmen</span> Fach 2</div>
          <div className="flex items-center gap-2"><span className="px-2 py-0.5 rounded-full font-bold bg-[#E6F1FB] text-[#2A71AA]">Daiane</span> Fach 1 (Carteira)</div>
          <div className="flex items-center gap-2"><span className="px-2 py-0.5 rounded-full font-bold bg-[#FAEEDA] text-[#B95232]">Yuri</span> Fach 1 (Montagem)</div>
          <div className="flex items-center gap-2"><span className="px-2 py-0.5 rounded-full font-bold bg-[var(--surface-3)] text-[var(--text-2)] border border-[var(--border)]">Equipe</span> Todos</div>
        </div>

        <div className="flex flex-col gap-3">
          {TRILHA_STAGES.map((stage) => {
            const isStageExpanded = expandedStages[stage.id];
            const stageCompleted = stage.tasks.every(t => checkedTasks[t.id]);
            const completedInStage = stage.tasks.filter(t => checkedTasks[t.id]).length;

            return (
              <div key={stage.id} className={`bg-white border rounded-lg overflow-hidden transition-all ${stageCompleted ? 'border-[var(--green-border)] shadow-sm' : completedInStage > 0 ? 'border-[var(--primary-border)]' : 'border-[var(--border)]'}`}>

                {/* Header do Accordion */}
                <div className="flex items-center p-4 cursor-pointer hover:bg-[var(--surface-2)] transition-colors" onClick={() => toggleStage(stage.id)}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shrink-0 mr-4 ${stageCompleted ? 'bg-[var(--green-bg)] text-[var(--green-text)]' : 'bg-[var(--primary-dim)] text-[var(--primary-text)]'}`}>
                    {stageCompleted ? '✓' : stage.id}
                  </div>
                  <div className="flex-1">
                    <span className="block font-bold text-[var(--text)]">{stage.name}</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    {stageCompleted && <span className="hidden md:block text-[10px] font-bold px-2 py-1 bg-[var(--green-bg)] text-[var(--green-text)] rounded-full uppercase tracking-widest">Concluída</span>}
                    <span className="text-sm font-semibold text-[var(--text-3)]">{completedInStage}/{stage.tasks.length}</span>
                    <span className={`text-xl text-[var(--text-3)] transition-transform ${isStageExpanded ? 'rotate-90' : ''}`}>›</span>
                  </div>
                </div>

                <div className="h-0.5 w-full bg-[var(--surface-3)]">
                  <div className={`h-full transition-all ${stageCompleted ? 'bg-[var(--green-text)]' : 'bg-[var(--primary)]'}`} style={{ width: `${(completedInStage / stage.tasks.length) * 100}%` }}></div>
                </div>

                {/* Tarefas */}
                {isStageExpanded && (
                  <div className="p-4 border-t border-[var(--border)] relative">
                    {isPending && <div className="absolute inset-0 bg-white/40 z-10" />}

                    <div className="flex flex-col">
                      {stage.tasks.map((task) => {
                        const isChecked = checkedTasks[task.id] || false;
                        const isTaskExpanded = expandedTasks[task.id];
                        const hasDetails = !!task.detailsHtml || task.id === '1-2';

                        // Verifica no estado (populado pelo banco) se há evidência
                        const hasEvidence = evidenceMap[task.id] || false;

                        return (
                          <div key={task.id} id={task.id} className={`border-b border-[var(--border)] last:border-0 transition-all duration-500 ${highlightedTask === task.id ? 'bg-orange-50 border-l-4 border-l-orange-400' : 'border-l-4 border-l-transparent'}`}>

                            <div className="flex items-center gap-3 py-3 px-2 transition-colors hover:bg-[var(--surface-2)]">

                              <input
                                type="checkbox"
                                className="w-5 h-5 accent-[var(--primary)] cursor-pointer mt-0.5 shrink-0 transition-transform active:scale-90"
                                checked={isChecked}
                                onChange={() => toggleTask(task.id)}
                              />

                              <span className={`flex-1 text-[13px] leading-snug transition-colors ${isChecked ? 'line-through text-[var(--text-3)]' : 'text-[var(--text-2)]'}`}>
                                {task.t}
                              </span>

                              {/* CONTAINER DE AÇÕES: Botões e Badges */}
                              <div className="flex items-center gap-2 shrink-0">

                                {/* Botão VISUALIZAR ("Olhinho"): Só aparece se tiver anexo no banco */}
                                {hasEvidence && (
                                  <EvidenceView taskId={task.id} />
                                )}

                                {/* Botão UPLOAD ("Clipe"): Fixo para a tarefa 1-1 para testes */}
                                {task.id === '1-1' && (
                                  <EvidenceButton
                                    taskId={task.id}
                                    hasEvidence={hasEvidence}
                                    // Callback para acender o olhinho e marcar o clipe na hora, sem precisar de F5
                                    onUploadSuccess={() => setEvidenceMap(prev => ({ ...prev, [task.id]: true }))} 
                                  />
                                )}

                                <span className={`ml-2 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                                  task.w === 'c' ? 'bg-[#EEEDFE] text-[#5B50D6] border-[#5B50D6]/20' :
                                  task.w === 'd' ? 'bg-[#E6F1FB] text-[#2A71AA] border-[#2A71AA]/20' :
                                  task.w === 'y' ? 'bg-[#FAEEDA] text-[#B95232] border-[#B95232]/20' :
                                  'bg-[var(--surface-3)] text-[var(--text-3)] border-[var(--border)]'
                                }`}>
                                  {WHO_LBL[task.w as keyof typeof WHO_LBL]}
                                </span>

                                {hasDetails && (
                                  <button
                                    className={`w-6 h-6 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary-dim)] rounded transition-transform ${isTaskExpanded ? 'rotate-90' : ''}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleTaskDetails(task.id, e);
                                    }}
                                  >
                                    ›
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Detalhes da Tarefa (HTML Injetado) */}
                            {hasDetails && isTaskExpanded && (
                              <div className="ml-[3.25rem] mr-4 my-3 p-6 bg-white border border-[var(--border)] border-l-[3px] border-l-[var(--primary)] rounded-r-lg shadow-sm text-[13px] text-[var(--text-2)] injecao-html animate-in slide-in-from-top-2 duration-300">
                                {task.id === '1-2' ? (
                                  <EditableResponsibilities />
                                ) : (
                                  <div dangerouslySetInnerHTML={{ __html: task.detailsHtml || "" }} />
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}