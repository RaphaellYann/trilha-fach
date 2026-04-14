"use client";

import { useState } from "react";

export default function PilaresPage() {
  const [activeSection, setActiveSection] = useState(0);

  const menuItems = [
    "Visão geral",
    "Kanban",
    "O que é PCP",
    "Planejamento",
    "Programação",
    "Controle"
  ];

  return (
    <div className="max-w-5xl mx-auto w-full pt-8 pb-16 flex flex-col md:flex-row gap-8">

      {/* Sidebar Navigation */}
      <div className="w-full md:w-56 shrink-0 flex flex-col gap-1 sticky top-24 h-fit">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveSection(index)}
            className={`text-left px-4 py-3 rounded-lg text-[13px] font-bold transition-colors ${activeSection === index
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "bg-white border border-[var(--border)] text-[var(--text-2)] hover:border-[var(--primary-border)] hover:text-[var(--primary)]"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0">

        {/* SEÇÃO 0: Visão Geral */}
        {activeSection === 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="mb-8 border-b border-[var(--border)] pb-6">
              <h1 className="text-3xl font-medium text-[var(--brand-dark)] uppercase tracking-tight mb-2">
                Plano de implantação — PCP
              </h1>
              <p className="text-sm text-[var(--text-2)]">Fach Industrial · Estrutura para rodar o PCP nas duas unidades</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-[var(--border)] rounded-lg p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-[var(--text)]">Fach 1</h3>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#E6F1FB] text-[#2A71AA] uppercase tracking-wider">Montagem</span>
                </div>
                <p className="text-[13px] text-[var(--text-2)] leading-relaxed">Onde o pedido nasce. Carteira de pedidos, análise de itens comprados (comerciais) e montagem final.</p>
                <div className="flex gap-2 mt-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F1FB] text-[#2A71AA] uppercase border border-[#2A71AA]/20">Daiane</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAEEDA] text-[#B95232] uppercase border border-[#B95232]/20">Yuri</span>
                </div>
              </div>

              <div className="bg-white border border-[var(--border)] rounded-lg p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-[var(--text)]">Fach 2</h3>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-[var(--green-bg)] text-[var(--green-text)] uppercase tracking-wider">Fabricação</span>
                </div>
                <p className="text-[13px] text-[var(--text-2)] leading-relaxed">Corte, dobra, usinagem e separação de peças. Análise de matéria-prima e abastecimento da Fach 1.</p>
                <div className="flex gap-2 mt-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEEDFE] text-[#5B50D6] uppercase border border-[#5B50D6]/20">Carmen</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-lg p-6 mb-6 shadow-sm">
              <h3 className="font-bold text-[var(--text)] mb-4">Os três pilares que vamos implantar</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] font-bold px-3 py-1.5 rounded bg-[#E6F1FB] text-[#2A71AA] uppercase">Planejamento — o que produzir</span>
                <span className="text-[11px] font-bold px-3 py-1.5 rounded bg-[var(--green-bg)] text-[var(--green-text)] uppercase">Programação — como/ordem</span>
                <span className="text-[11px] font-bold px-3 py-1.5 rounded bg-[#FFFBEA] text-[#B97B00] uppercase border border-[#FFE4A0]">Controle — o que foi feito</span>
              </div>
            </div>

            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-5 border-l-4 border-l-[#ef4444] mt-6">
              <h3 className="text-[13px] font-bold text-[#b91c1c] uppercase tracking-widest mb-2">Principal desafio: congelar a programação</h3>
              <p className="text-[13px] text-[#991b1b] leading-relaxed">Sem uma programação estável, nenhuma rotina funciona. A implantação começa por aqui: definir um horizonte curto e não mudar o que foi programado sem justificativa formal.</p>
            </div>
          </div>
        )}

        {/* SEÇÃO 1: Kanban */}
        {activeSection === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="block text-[11px] font-bold text-[var(--text-3)] uppercase tracking-widest mb-4">Kanban — prioridade da implantação</span>

            <div className="bg-white border border-[var(--border)] rounded-lg p-5 mb-4 shadow-sm">
              <h3 className="font-bold text-[var(--text)] mb-2">Por que o kanban vem primeiro</h3>
              <p className="text-[13px] text-[var(--text-2)] leading-relaxed">Hoje a Fach 2 processa cerca de <strong className="text-[var(--text)]">1.400 ordens por pedido</strong>. Boa parte são peças repetitivas que poderiam ser repostas automaticamente — sem OP, sem fila de análise, sem espera. O kanban elimina a necessidade de emitir uma OP para cada uma dessas peças. Resultado imediato: menos papel, menos fila, menos parada.</p>
            </div>

            <div className="bg-white border border-[var(--border)] border-l-4 border-l-[var(--green-text)] rounded-lg p-5 mb-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-[var(--text)]">Kanban 320 — Fach 2</h3>
                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[var(--green-bg)] text-[var(--green-text)]">-50% de OPs</span>
              </div>
              <p className="text-[13px] text-[var(--text-2)]">Itens séries 320 (peças fabricadas que se repetem entre pedidos).</p>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-lg p-5 mb-4 shadow-sm">
              <span className="block text-[11px] font-bold text-[var(--text-3)] uppercase tracking-widest mb-4">Como vai funcionar</span>
              <ul className="flex flex-col gap-4 text-[13px] text-[var(--text-2)] mb-4">
                <li className="flex gap-3"><span className="w-6 h-6 shrink-0 rounded-full bg-[var(--green-bg)] text-[var(--green-text)] font-bold flex items-center justify-center text-xs">1</span> <div><strong className="text-[var(--text)] block mb-0.5">Levantamento dos itens 320</strong> identificar todos que se repetem entre pedidos com código, descrição e frequência de uso.</div></li>
                <li className="flex gap-3"><span className="w-6 h-6 shrink-0 rounded-full bg-[var(--green-bg)] text-[var(--green-text)] font-bold flex items-center justify-center text-xs">2</span> <div><strong className="text-[var(--text)] block mb-0.5">Cálculo do ponto de reposição</strong> lead time de fabricação + consumo médio = quantidade mínima no estoque para acionar o cartão.</div></li>
                <li className="flex gap-3"><span className="w-6 h-6 shrink-0 rounded-full bg-[var(--green-bg)] text-[var(--green-text)] font-bold flex items-center justify-center text-xs">3</span> <div><strong className="text-[var(--text)] block mb-0.5">Cartão físico por item</strong> o cartão viaja com o lote de peças. Quando a última peça sai, o cartão vai para o quadro de produção de Carmen.</div></li>
                <li className="flex gap-3"><span className="w-6 h-6 shrink-0 rounded-full bg-[var(--green-bg)] text-[var(--green-text)] font-bold flex items-center justify-center text-xs">4</span> <div><strong className="text-[var(--text)] block mb-0.5">Carmen programa a reposição</strong> Carmen vê o cartão no quadro e inclui a peça na programação da semana automaticamente.</div></li>
                <li className="flex gap-3"><span className="w-6 h-6 shrink-0 rounded-full bg-[var(--green-bg)] text-[var(--green-text)] font-bold flex items-center justify-center text-xs">5</span> <div><strong className="text-[var(--text)] block mb-0.5">Validação da redução de OPs</strong> acompanhar a queda no volume de ordens abertas a cada ciclo.</div></li>
              </ul>
              <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
                <span className="text-xs text-[var(--text-2)]">Responsável pela gestão completa</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEEDFE] text-[#5B50D6] uppercase border border-[#5B50D6]/20">Carmen</span>
              </div>
            </div>

            <div className="bg-white border border-[var(--border)] border-l-4 border-l-[#2A71AA] rounded-lg p-5 mb-4 shadow-sm mt-6">
              <h3 className="font-bold text-[var(--text)] mb-1">Kanban 220 — Conjuntos (Fach 1)</h3>
              <p className="text-[13px] text-[var(--text-2)]">A gestão dos cartões fica centralizada com Yuri. Sinalizando a necessidade dos 320 para Fach 2.</p>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-lg p-5 shadow-sm">
              <span className="block text-[11px] font-bold text-[var(--text-3)] uppercase tracking-widest mb-4">Divisão de papéis</span>

              <div className="flex items-start gap-3 py-3 border-b border-[var(--border)]">
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Gestão centralizada</strong>
                  <span>Define cartões, pontos de reposição e quantidades. Organiza a reposição pela Fach 2. Mantém o quadro atualizado.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEEDFE] text-[#5B50D6] uppercase border border-[#5B50D6]/20">Carmen</span>
              </div>

              <div className="flex items-start gap-3 py-3">
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Apenas aciona o cartão</strong>
                  <span>Quando o estoque de um conjunto cai abaixo do ponto, Yuri aciona o cartão gerando a OP do conjunto 220 e solicitando os 320 para Carmen.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAEEDA] text-[#B95232] uppercase border border-[#B95232]/20">Yuri</span>
              </div>
              <p className="text-xs text-[var(--text-3)] mt-3">O kanban 220 será implantado após a estabilização do kanban 320.</p>
            </div>
          </div>
        )}

        {/* SEÇÃO 2: O que é PCP */}
        {activeSection === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="block text-[11px] font-bold text-[var(--text-3)] uppercase tracking-widest mb-4">Treinamento</span>
            <div className="bg-white border border-[var(--border)] rounded-lg p-5 mb-6 shadow-sm">
              <h3 className="font-bold text-[var(--text)] mb-2">Por que precisamos do PCP?</h3>
              <p className="text-[13px] text-[var(--text-2)] leading-relaxed">Sem PCP, cada um trabalha no "apagar incêndio". Com PCP, a equipe sabe <strong className="text-[var(--text)]">o que produzir</strong>, <strong className="text-[var(--text)]">quando entregar</strong> e <strong className="text-[var(--text)]">o que está atrasado</strong> — antes do cliente reclamar.</p>
            </div>

            <div className="bg-[var(--surface-2)] border-l-4 border-l-[#2A71AA] rounded-r-lg p-5 mb-4">
              <h3 className="font-bold text-[#2A71AA] mb-2">Planejamento</h3>
              <p className="text-[13px] text-[var(--text-2)]"><strong className="text-[var(--text)]">O que é:</strong> Olhar para a carteira de pedidos e decidir o que vai ser feito nas próximas semanas e no mês.<br /><strong className="text-[var(--text)]">Objetivo:</strong> Garantir material, capacidade e prazo antes de iniciar a produção.</p>
            </div>

            <div className="bg-[var(--surface-2)] border-l-4 border-l-[var(--green-text)] rounded-r-lg p-5 mb-4">
              <h3 className="font-bold text-[var(--green-text)] mb-2">Programação</h3>
              <p className="text-[13px] text-[var(--text-2)]"><strong className="text-[var(--text)]">O que é:</strong> Colocar na ordem certa as tarefas de cada setor para a semana e para o dia.<br /><strong className="text-[var(--text)]">Objetivo:</strong> Dizer para a fábrica "hoje você faz isso, nessa sequência" — e manter essa sequência.</p>
            </div>

            <div className="bg-[var(--surface-2)] border-l-4 border-l-[#B97B00] rounded-r-lg p-5 mb-4">
              <h3 className="font-bold text-[#B97B00] mb-2">Controle</h3>
              <p className="text-[13px] text-[var(--text-2)]"><strong className="text-[var(--text)]">O que é:</strong> Comparar o que foi programado com o que foi realmente produzido.<br /><strong className="text-[var(--text)]">Objetivo:</strong> Identificar atrasos cedo, corrigir antes de virar problema e melhorar o planejamento futuro.</p>
            </div>
          </div>
        )}

        {/* SEÇÃO 3: Planejamento */}
        {activeSection === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="block text-[11px] font-bold text-[var(--text-3)] uppercase tracking-widest mb-4">Rotinas de planejamento — o que e quando produzir</span>

            <div className="bg-[var(--surface-2)] border-l-4 border-l-[#2A71AA] rounded-r-lg p-5 mb-6">
              <h3 className="font-bold text-[#2A71AA] mb-2">Objetivo do planejamento</h3>
              <p className="text-[13px] text-[var(--text-2)]">Garantir que, antes de a semana começar, a equipe saiba quais pedidos serão produzidos, se há material disponível e se a capacidade é suficiente.</p>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-lg p-5 shadow-sm">

              <div className="flex items-start gap-4 py-3 border-b border-[var(--border)]">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#FBEAFA] text-[#9A2B93] uppercase mt-0.5">Mensal</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Revisão da carteira de pedidos</strong>
                  <span>Listar todos os pedidos em aberto, datas de entrega e prioridades do mês.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F1FB] text-[#2A71AA] uppercase border border-[#2A71AA]/20">Daiane</span>
              </div>

              <div className="flex items-start gap-4 py-3 border-b border-[var(--border)]">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#FBEAFA] text-[#9A2B93] uppercase mt-0.5">Mensal</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Análise de capacidade</strong>
                  <span>Verificar se a fábrica tem horas disponíveis para atender o volume do mês.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEEDFE] text-[#5B50D6] uppercase border border-[#5B50D6]/20">Carmen</span>
              </div>

              <div className="flex items-start gap-4 py-3 border-b border-[var(--border)]">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#E6F1FB] text-[#2A71AA] uppercase mt-0.5">Semanal</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Revisão de pedidos prioritários</strong>
                  <span>Toda segunda-feira: selecionar os pedidos da semana e confirmar materiais disponíveis.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F1FB] text-[#2A71AA] uppercase border border-[#2A71AA]/20">Daiane</span>
              </div>

              <div className="flex items-start gap-4 py-3 border-b border-[var(--border)]">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#E6F1FB] text-[#2A71AA] uppercase mt-0.5">Semanal</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Alinhamento Fach 1 ↔ Fach 2</strong>
                  <span>Reunião rápida (15 min) para alinhar necessidade de peças da semana.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEEDFE] text-[#5B50D6] uppercase border border-[#5B50D6]/20">Carmen</span>
              </div>

              <div className="flex items-start gap-4 py-3">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#E6F1FB] text-[#2A71AA] uppercase mt-0.5">Semanal</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Gestão do quadro de kanbam</strong>
                  <span>Atualizar prioridades da semana. Garantir que os cartões estejam corretos.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEEDFE] text-[#5B50D6] uppercase border border-[#5B50D6]/20">Carmen</span>
              </div>

            </div>
          </div>
        )}

        {/* SEÇÃO 4: Programação */}
        {activeSection === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="block text-[11px] font-bold text-[var(--text-3)] uppercase tracking-widest mb-4">Rotinas de programação — como e em que ordem produzir</span>

            <div className="bg-[var(--surface-2)] border-l-4 border-l-[var(--green-text)] rounded-r-lg p-5 mb-6">
              <h3 className="font-bold text-[var(--green-text)] mb-2">Objetivo da programação</h3>
              <p className="text-[13px] text-[var(--text-2)]">Definir a sequência de produção de cada setor para a semana e para o dia. A programação precisa ser respeitada — mudanças constantes destroem o ritmo da fábrica.</p>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-lg p-5 mb-6 shadow-sm">
              <div className="flex items-start gap-4 py-3 border-b border-[var(--border)]">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#E6F1FB] text-[#2A71AA] uppercase mt-0.5">Semanal</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Programação semanal da Fach 2</strong>
                  <span>Sequência de corte, dobra e usinagem para cada OP da semana. <em className="text-[var(--primary-text)] font-semibold">Travada toda segunda.</em></span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEEDFE] text-[#5B50D6] uppercase border border-[#5B50D6]/20">Carmen</span>
              </div>

              <div className="flex items-start gap-4 py-3 border-b border-[var(--border)]">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#E6F1FB] text-[#2A71AA] uppercase mt-0.5">Semanal</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Programação semanal da Fach 1</strong>
                  <span>Sequência de montagem conforme disponibilidade de peças da Fach 2.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAEEDA] text-[#B95232] uppercase border border-[#B95232]/20">Yuri</span>
              </div>

              <div className="flex items-start gap-4 py-3 border-b border-[var(--border)]">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[var(--green-bg)] text-[var(--green-text)] uppercase mt-0.5">Diária</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Abertura de OP</strong>
                  <span>Registrar abertura das ordens que entram em produção no dia.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAEEDA] text-[#B95232] uppercase border border-[#B95232]/20">Yuri</span>
              </div>

              <div className="flex items-start gap-4 py-3 border-b border-[var(--border)]">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[var(--green-bg)] text-[var(--green-text)] uppercase mt-0.5">Diária</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Confirmação de sequência diária — Fach 2</strong>
                  <span>Manhã: Carmen confirma com os setores a ordem do dia.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEEDFE] text-[#5B50D6] uppercase border border-[#5B50D6]/20">Carmen</span>
              </div>

              <div className="flex items-start gap-4 py-3">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[var(--green-bg)] text-[var(--green-text)] uppercase mt-0.5">Diária</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Registro de liberação de peças</strong>
                  <span>Registrar quando um lote é liberado da Fach 2 para a Fach 1.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEEDFE] text-[#5B50D6] uppercase border border-[#5B50D6]/20">Carmen</span>
              </div>
            </div>

            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-5 border-l-4 border-l-[#ef4444]">
              <h3 className="text-[13px] font-bold text-[#b91c1c] uppercase tracking-widest mb-2">Como congelar a programação na prática</h3>
              <p className="text-[13px] text-[#991b1b] leading-relaxed mb-1">1. Programação definida toda <strong>segunda até as 10h</strong>.</p>
              <p className="text-[13px] text-[#991b1b] leading-relaxed mb-1">2. Qualquer alteração exige <strong>autorização por escrito</strong> (mensagem registrada).</p>
              <p className="text-[13px] text-[#991b1b] leading-relaxed mb-1">3. Motivo obrigatório — serve para melhorar o planejamento futuro.</p>
              <p className="text-[13px] text-[#991b1b] leading-relaxed">4. Carmen avisa o PCP da Fach 1 se houver risco de atraso.</p>
            </div>
          </div>
        )}

        {/* SEÇÃO 5: Controle */}
        {activeSection === 5 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="block text-[11px] font-bold text-[var(--text-3)] uppercase tracking-widest mb-4">Rotinas de controle — o que foi feito de verdade</span>

            <div className="bg-[var(--surface-2)] border-l-4 border-l-[#B97B00] rounded-r-lg p-5 mb-6">
              <h3 className="font-bold text-[#B97B00] mb-2">Objetivo do controle</h3>
              <p className="text-[13px] text-[var(--text-2)]">Comparar o que foi programado com o que saiu da fábrica. Identificar atrasos cedo e registrar motivos. Sem controle, o planejamento não melhora nunca.</p>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-4 py-3 border-b border-[var(--border)]">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[var(--green-bg)] text-[var(--green-text)] uppercase mt-0.5">Diária</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Apontamento de produção — Fach 2</strong>
                  <span>O que foi produzido no dia: quantidade e OP por setor.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEEDFE] text-[#5B50D6] uppercase border border-[#5B50D6]/20">Carmen</span>
              </div>

              <div className="flex items-start gap-4 py-3 border-b border-[var(--border)]">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[var(--green-bg)] text-[var(--green-text)] uppercase mt-0.5">Diária</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Apontamento de produção — Fach 1</strong>
                  <span>Avanço de montagem: quais OPs foram fechadas ou avançaram no dia.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAEEDA] text-[#B95232] uppercase border border-[#B95232]/20">Yuri</span>
              </div>

              <div className="flex items-start gap-4 py-3 border-b border-[var(--border)]">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[var(--green-bg)] text-[var(--green-text)] uppercase mt-0.5">Diária</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Registro de paradas e desvios</strong>
                  <span>Toda vez que a production parou ou mudou de sequência, com motivo obrigatório.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEEDFE] text-[#5B50D6] uppercase border border-[#5B50D6]/20">Carmen</span>
              </div>

              <div className="flex items-start gap-4 py-3 border-b border-[var(--border)]">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#E6F1FB] text-[#2A71AA] uppercase mt-0.5">Semanal</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Reunião de fechamento semanal</strong>
                  <span>Sexta-feira: o que foi entregue, o que ficou em aberto e os motivos. 20 minutos.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F1FB] text-[#2A71AA] uppercase border border-[#2A71AA]/20">Daiane</span>
              </div>

              <div className="flex items-start gap-4 py-3 border-b border-[var(--border)]">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#E6F1FB] text-[#2A71AA] uppercase mt-0.5">Semanal</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Indicador de aderência à programação</strong>
                  <span>Calcular % de OPs entregues na data programada.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEEDFE] text-[#5B50D6] uppercase border border-[#5B50D6]/20">Carmen</span>
              </div>

              <div className="flex items-start gap-4 py-3">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#FBEAFA] text-[#9A2B93] uppercase mt-0.5">Mensal</span>
                <div className="flex-1 text-[13px] text-[var(--text-2)] flex flex-col gap-1">
                  <strong className="text-[var(--text)]">Relatório mensal ao gestor</strong>
                  <span>Volume produzido, principais atrasos, indicadores e ações de melhoria.</span>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F1FB] text-[#2A71AA] uppercase border border-[#2A71AA]/20">Daiane</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}