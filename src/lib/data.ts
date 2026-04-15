export const WHO_MAP = { c: 'wc', d: 'wd', y: 'wy', eq: 'weq' };
export const WHO_LBL = { c: 'Carmen', d: 'Daiane', y: 'Yuri', eq: 'Equipe' };

const fluxoHTML = `
  <div class="section" id="s2">
    <p class="section-label">Fluxo do pedido</p>
    
    <div class="flow-step">
      <div class="flow-icon" style="background:#E6F1FB">📋</div>
      <div class="flow-body"><strong>Gatilho: liberação da Engenharia</strong><span>E-mail da Engenharia.</span></div>
    </div>
    <div class="flow-step"><div class="flow-connector"><div class="flow-line"></div></div></div>
    
    <div class="flow-step">
      <div class="flow-icon" style="background:#EEEDFE">📤</div>
      <div class="flow-body"><strong>Etapa 01: Planejamento e Programação</strong><span>Data de entrega no planejador Programação por etapa.</span></div>
    </div>
    <div class="flow-step"><div class="flow-connector"><div class="flow-line"></div></div></div>
    
    <div class="flow-step">
      <div class="flow-icon" style="background:#E6F1FB">📋</div>
      <div class="flow-body"><strong>Etapa 02 - Análise de Demanda</strong><span>Gera OPs 120, 620 e 220 Solicita compra de 320 e comerciais.</span></div>
    </div>
    <div class="flow-step"><div class="flow-connector"><div class="flow-line"></div></div></div>
    
    <div class="flow-step">
      <div class="flow-icon" style="background:#E1F5EE">⚙️</div>
      <div class="flow-body"><strong>Etapa 03 Fach 2:</strong><span>Produção dos 320 · Lista de separação por estrutura (Kanban × PV).</span></div>
    </div>
    <div class="flow-step"><div class="flow-connector"><div class="flow-line"></div></div></div>
    
    <div class="flow-step">
      <div class="flow-icon" style="background:#FAEEDA">📦</div>
      <div class="flow-body"><strong>Etapa 03 Fach 1:</strong><span>Prepara montagem dos 220 · Confere 320 recebidos · Apontamento macro.</span></div>
    </div>
    <div class="flow-step"><div class="flow-connector"><div class="flow-line"></div></div></div>
    
    <div class="flow-step">
      <div class="flow-icon" style="background:#EAF3DE">🔩</div>
      <div class="flow-body"><strong>Etapa 04: Separação e Envio</strong><span>Fach 2 → Fach 1.</span></div>
    </div>
    <div class="flow-step"><div class="flow-connector"><div class="flow-line"></div></div></div>
    
    <div class="flow-step">
      <div class="flow-icon" style="background:#EAF3DE">🔩</div>
      <div class="flow-body"><strong>Etapa 05: Expedição</strong><span>Lista de expedição · check de recebidos · pendências atualizadas.</span></div>
    </div>
    <div class="flow-step"><div class="flow-connector"><div class="flow-line"></div></div></div>
    
    <div class="flow-step">
      <div class="flow-icon" style="background:#E6F1FB">✅</div>
      <div class="flow-body"><strong>Pedido concluído</strong><span>Alimentar indicadores.</span></div>
    </div>

    <div class="card-aviso-azul">
      <strong>Aviso: Kanban 320 e 220 - Operação independente</strong>
      Autoalimenta pelo nível de estoque · paralelo a todas as etapas. Depende apenas do consumo nas prateleiras.
    </div>
    
    <div class="card-aviso-laranja">
      <strong>Ponto crítico:</strong>
      <p style="margin-top: 8px; margin-bottom: 4px;"><strong>1. Congelamento da programação</strong></p>
      <p style="margin-bottom: 12px;">Toda segunda-feira a programação da semana é travada. Mudanças só com autorização formal e motivo registrado. Protege a semana em curso — sem isso, a sequência da fábrica é destruída por mudanças de última hora.</p>
      
      <p style="margin-bottom: 4px;"><strong>2. Checagem no recebimento dos 320</strong></p>
      <p style="margin-bottom: 12px;">Na chegada dos itens 320 na Fach 1, conferência obrigatória antes de iniciar a montagem. Protege o meio do processo — identifica falta ou divergência de peça antes de montar, evitando ruptura com a máquina já parcialmente montada.</p>
      
      <p style="margin-bottom: 4px;"><strong>3. Lista de pendências do PV uma semana antes do carregamento</strong></p>
      <p>Fechar e divulgar a lista de pendências do pedido de venda uma semana antes da expedição. Protege a entrega final — janela mínima para correr atrás de peças faltantes sem estourar o prazo do cliente.</p>
    </div>
  </div>`;

export const TRILHA_STAGES = [
  {
    id: 1, name: 'Alinhamento e base', tasks: [
      { id: '1-0', t: 'Apresentar o fluxo do pedido (Fach 1 → Fach 2 → Fach 1) para as 3 pessoas', w: 'eq', detailsHtml: fluxoHTML },
      { id: '1-1', t: 'Conferir pedidos liberados que precisam ser programados', w: 'd' },
      { id: '1-2', t: 'Definir formalmente os papéis: Daiane (carteira), Yuri (montagem e comprados), Carmen (fabricação e kanban)', w: 'eq' },
    ]
  },
  {
    id: 2, name: 'Kanban 320 — Fach 2', tasks: [
      { id: '2-0', t: 'Apresentar a lógica do kanban e o impacto esperado na redução de OPs', w: 'eq' },
      { id: '2-1', t: 'Identificar todos os itens 320 que se repetem entre pedidos com código e frequência', w: 'c' },
      { id: '2-2', t: 'Calcular ponto de reposição e quantidade do lote por item', w: 'c' },
      { id: '2-3', t: 'Criar os cartões físicos do kanban (etiqueta com código, descrição e quantidade)', w: 'c' },
      { id: '2-4', t: 'Montar e fixar o quadro de kanban na Fach 2 (colunas: A fabricar | Em produção)', w: 'c' },
      { id: '2-5', t: 'Treinar Carmen na gestão do quadro: quando acionar, como repor e como analisar', w: 'c' },
      { id: '2-6', t: 'Análisar o giro de reposição do Kanban', w: 'c' },
      { id: '2-7', t: 'Validar redução no volume de OPs abertas na Fach 2 (meta: −50%)', w: 'd' },
    ]
  },
  {
    id: 3, name: 'Análise de comprados', tasks: [
      {
        id: '3-0', t: 'Fach 1: Análise de demanda de itens comprados fach1 - (códigos 420 + 520 + 580 + 980)', w: 'eq',
        detailsHtml: `
        <div class="section" id="s6">
          <p style="font-size: 11px; font-weight: 800; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px;">Análise de demanda de itens comprados</p>
          
          <h3 style="font-size: 18px; font-weight: 700; color: var(--brand-dark); margin-bottom: 12px;">Fach 1 — Análise de Itens Comerciais</h3>
          
          <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            <p style="font-size: 11px; font-weight: 800; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px;">Passo a Passo</p>
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #E6F1FB; color: #2A71AA; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">1</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Após a liberação do pedido pela engenharia, gerar a ordem de produção vinculada ao pedido de venda.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #E6F1FB; color: #2A71AA; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">2</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Identificar na estrutura do produto os itens comerciais necessários ao atendimento do pedido.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #E6F1FB; color: #2A71AA; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">3</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Filtrar apenas os itens comerciais da FACH1, considerando os grupos definidos para esta análise.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #E6F1FB; color: #2A71AA; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">4</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Verificar no ERP quais itens possuem saldo disponível e quais apresentam necessidade de compra.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #E6F1FB; color: #2A71AA; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">5</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Avaliar se os itens faltantes possuem risco de prazo em relação à data necessária de montagem.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #E6F1FB; color: #2A71AA; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">6</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Gerar a solicitação de compra somente dos itens comerciais não cobertos pelo estoque.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #E6F1FB; color: #2A71AA; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">7</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Sinalizar imediatamente os casos críticos para replanejamento.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #E6F1FB; color: #2A71AA; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">8</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Acompanhar os itens críticos até o recebimento para garantir atendimento do pedido.</p>
              </div>
            </div>
          </div>

          <div style="background: #FFF9EB; border: 1px solid #FDE68A; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="font-size: 11px; font-weight: 800; color: #D97706; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px;">Quando fazer esta análise</p>
            <p style="font-size: 13px; color: #92400E; margin: 0;">Logo após a geração da ordem de produção, com o pedido já liberado pela engenharia. A análise deve ocorrer no início do fluxo, e não próxima da montagem.</p>
          </div>

          <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 32px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h4 style="font-size: 14px; font-weight: 700; color: var(--brand-dark); margin: 0;">Responsável</h4>
              <span style="background: #FAEEDA; color: #B95232; font-size: 10px; font-weight: bold; padding: 3px 10px; border-radius: 999px;">Yuri</span>
            </div>
            <p style="font-size: 13px; color: var(--text-2); margin: 0;">Yuri, com escalonamento para Daiane em casos críticos de prazo ou indisponibilidade.</p>
          </div>

          <h3 style="font-size: 18px; font-weight: 700; color: var(--brand-dark); margin-bottom: 6px;">Fach 2 — Análise de Matéria-prima</h3>
          <p style="font-size: 13px; color: var(--text-2); margin-bottom: 16px;">Materiais brutos usados no corte, dobra e usinagem. A análise é feita antes de iniciar a programação da semana, garantindo que a fábrica não pare por falta de material.</p>
          
          <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            <p style="font-size: 11px; font-weight: 800; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px;">Como analisar — Passo a Passo</p>
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #EEEDFE; color: #5B50D6; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">1</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Identificar, a partir dos pedidos e ordens de produção, os itens fabricados internamente que precisarão entrar na programação.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #EEEDFE; color: #5B50D6; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">2</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Filtrar os itens da linha 320 que demandam fabricação interna.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #EEEDFE; color: #5B50D6; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">3</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Verificar quais itens já estão cobertos pelo saldo do kanban e quais precisarão ser fabricados.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #EEEDFE; color: #5B50D6; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">4</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Explodir os itens não cobertos até o nível de matéria-prima necessária para fabricação.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #EEEDFE; color: #5B50D6; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">5</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Consolidar a necessidade total de matéria-prima da semana, agrupando materiais iguais.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #EEEDFE; color: #5B50D6; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">6</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Verificar no ERP a disponibilidade dos materiais necessários.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #EEEDFE; color: #5B50D6; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">7</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Quando necessário, complementar a análise com conferência física dos materiais com baixa confiabilidade de saldo.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #EEEDFE; color: #5B50D6; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">8</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Gerar a solicitação de compra apenas da matéria-prima não coberta para atendimento da programação.</p>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #EEEDFE; color: #5B50D6; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">9</div>
                <p style="font-size: 13px; color: var(--text-2); margin: 0; padding-top: 2px;">Acompanhar os materiais críticos antes do início da produção e sinalizar necessidade de replanejamento, quando houver risco de falta.</p>
              </div>
            </div>
          </div>

          <div style="background: #FFF9EB; border: 1px solid #FDE68A; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="font-size: 11px; font-weight: 800; color: #D97706; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px;">Quando Realizar</p>
            <p style="font-size: 13px; color: #92400E; margin: 0;">Toda sexta-feira à tarde, com base na programação da semana seguinte, para antecipar faltas antes do travamento da programação.</p>
          </div>

          <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h4 style="font-size: 14px; font-weight: 700; color: var(--brand-dark); margin: 0;">Responsável</h4>
              <span style="background: #EEEDFE; color: #5B50D6; font-size: 10px; font-weight: bold; padding: 3px 10px; border-radius: 999px;">Carmen</span>
            </div>
            <p style="font-size: 13px; color: var(--text-2); margin: 0;">Carmen realiza a análise toda sexta-feira. A solicitação de compra gerada é encaminhada para o comprador (ou Daiane, conforme o fluxo atual). Qualquer risco de falta na semana seguinte é comunicado na reunião de fechamento.</p>
          </div>

        </div>
        `
      },
      { id: '3-1', t: 'Treinar Yuri para inserir ponto de pedido, lote econômico de compra e lead time de ressuprimento dos itens comerciais, com base na classificação ABC, custo unitário e histórico de consumo.', w: 'y' },
      { id: '3-2', t: 'Fach 2: implantar análise de matéria-prima toda sexta-feira à tarde', w: 'c' },
      { id: '3-3', t: 'Definir regra: item com risco de ruptura que impacte a montagem vai para Daiane no mesmo dia, para reprogramação, com registro do item faltante, código e previsão de ressuprimento, avaliando se deve virar item Kanban.', w: 'd' },
    ]
  },
  {
    id: 4, name: 'Programação congelada', tasks: [
      {
        id: '4-0', t: 'Comunicar a regra de congelamento para toda a equipe: segunda até 10h, mudança só com justificativa registrada', w: 'd',
        detailsHtml: `
        <div class="section" id="s3">
          <p style="font-size: 11px; font-weight: 800; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px;">Programação</p>
          
          <div style="background: #FEF2F2; border: 1px solid #FECACA; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <h3 style="font-size: 14px; font-weight: 700; color: #991B1B; text-transform: uppercase; margin-bottom: 8px;">Regra de ouro: programação congelada</h3>
            <p style="font-size: 13px; color: #991B1B; margin: 0;">Toda segunda-feira até as 10h a programação da semana está travada para as duas fábricas. Mudança só com justificativa registrada por escrito. Isso protege a sequência e dá previsibilidade.</p>
          </div>
          
          <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 20px; margin-bottom: 32px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            <h3 style="font-size: 16px; font-weight: 700; color: var(--brand-dark); margin-bottom: 16px; margin-top: 0;">Rotinas</h3>
            <div style="display: flex; flex-direction: column;">
              
              <div style="display: flex; align-items: flex-start; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid var(--border);">
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="background: #E0F2FE; color: #0369A1; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">Semanal</span>
                  <div>
                    <strong style="font-size: 14px; color: var(--text); display: block; margin-bottom: 4px;">Programação da Fach 2 — segunda até 10h</strong>
                    <span style="font-size: 13px; color: var(--text-2);">Carmen define sequência de corte, dobra e usinagem para cada pedido da semana.</span>
                  </div>
                </div>
                <span style="background: #FFEDD5; border: 1px solid #FED7AA; color: #C2410C; font-size: 10px; font-weight: bold; padding: 3px 12px; border-radius: 999px; margin-left: 16px; flex-shrink: 0;">Carmen</span>
              </div>
              
              <div style="display: flex; align-items: flex-start; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid var(--border);">
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="background: #E0F2FE; color: #0369A1; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">Semanal</span>
                  <div>
                    <strong style="font-size: 14px; color: var(--text); display: block; margin-bottom: 4px;">Programação da Fach 1 — segunda até 10h</strong>
                    <span style="font-size: 13px; color: var(--text-2);">Yuri define sequência de montagem conforme peças disponíveis e a vir da Fach 2.</span>
                  </div>
                </div>
                <span style="background: #FCE7F3; border: 1px solid #FBCFE8; color: #BE185D; font-size: 10px; font-weight: bold; padding: 3px 12px; border-radius: 999px; margin-left: 16px; flex-shrink: 0;">Yuri</span>
              </div>
              
              <div style="display: flex; align-items: flex-start; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid var(--border);">
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="background: #DCFCE7; color: #15803D; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">Diária</span>
                  <div>
                    <strong style="font-size: 14px; color: var(--text); display: block; margin-bottom: 4px;">Confirmação da sequência do dia</strong>
                    <span style="font-size: 13px; color: var(--text-2);">Carmen confirma com os setores a ordem do dia e registra qualquer desvio.</span>
                  </div>
                </div>
                <span style="background: #FFEDD5; border: 1px solid #FED7AA; color: #C2410C; font-size: 10px; font-weight: bold; padding: 3px 12px; border-radius: 999px; margin-left: 16px; flex-shrink: 0;">Carmen</span>
              </div>
              
              <div style="display: flex; align-items: flex-start; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid var(--border);">
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="background: #DCFCE7; color: #15803D; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">Diária</span>
                  <div>
                    <strong style="font-size: 14px; color: var(--text); display: block; margin-bottom: 4px;">Liberação de peças Fach 2 → Fach 1</strong>
                    <span style="font-size: 13px; color: var(--text-2);">Carmen registra quando um lote de peças é liberado para a Fach 1 (grupo WhatsApp ou planilha).</span>
                  </div>
                </div>
                <span style="background: #FFEDD5; border: 1px solid #FED7AA; color: #C2410C; font-size: 10px; font-weight: bold; padding: 3px 12px; border-radius: 999px; margin-left: 16px; flex-shrink: 0;">Carmen</span>
              </div>
              
              <div style="display: flex; align-items: flex-start; justify-content: space-between; padding-top: 16px;">
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="background: #E0F2FE; color: #0369A1; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">Semanal</span>
                  <div>
                    <strong style="font-size: 14px; color: var(--text); display: block; margin-bottom: 4px;">Reunião de fechamento — sexta</strong>
                    <span style="font-size: 13px; color: var(--text-2);">20 minutos. O que foi concluído, o que ficou em aberto e os motivos. Daiane conduz.</span>
                  </div>
                </div>
                <span style="background: #E0F2FE; border: 1px solid #BAE6FD; color: #0369A1; font-size: 10px; font-weight: bold; padding: 3px 12px; border-radius: 999px; margin-left: 16px; flex-shrink: 0;">Daiane</span>
              </div>
              
            </div>
          </div>
          
          <p style="font-size: 11px; font-weight: 800; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px;">Apontamento simplificado</p>
          
          <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            <h3 style="font-size: 16px; font-weight: 700; color: var(--brand-dark); margin-bottom: 12px; margin-top: 0;">O que registrar — só o essencial</h3>
            <p style="font-size: 13px; color: var(--text-2); margin-bottom: 20px;">O apontamento não precisa ser complexo. Objetivo neste momento: registrar início e fim de cada etapa de produção para comparar o realizado com o Gantt planejado.</p>
            
            <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
              
              <div style="display: flex; gap: 12px; align-items: center; padding: 12px 16px; background: var(--surface-2); border-radius: 6px; border: 1px solid var(--border);">
                <span style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; background: white; border: 1px solid var(--border); border-radius: 50%; font-size: 13px; font-weight: bold; color: var(--text); flex-shrink: 0;">1</span>
                <div>
                  <p style="font-size: 14px; font-weight: 700; color: var(--text); margin: 0; margin-bottom: 2px;">PV entrou em produção</p>
                  <p style="font-size: 13px; color: var(--text-2); margin: 0;">Etapa do pedido + data de início</p>
                </div>
              </div>
              
              <div style="display: flex; gap: 12px; align-items: center; padding: 12px 16px; background: var(--surface-2); border-radius: 6px; border: 1px solid var(--border);">
                <span style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; background: white; border: 1px solid var(--border); border-radius: 50%; font-size: 13px; font-weight: bold; color: var(--text); flex-shrink: 0;">2</span>
                <div>
                  <p style="font-size: 14px; font-weight: 700; color: var(--text); margin: 0; margin-bottom: 2px;">Etapa do PV concluído</p>
                  <p style="font-size: 13px; color: var(--text-2); margin: 0;">Etapa do pedido + data de conclusão + quantidade produzida</p>
                </div>
              </div>
              
            </div>
            
            <div style="border-top: 1px solid var(--border); padding-top: 16px;">
              <p style="font-size: 13px; color: var(--text-3); margin: 0;">Ferramenta sugerida: <strong style="color: var(--text-2); font-weight: 600;">Planejador PCP</strong>.</p>
            </div>
          </div>
          
        </div>
        `
      },
      { id: '4-1', t: 'Configurar planilha de programação semanal de fabricação da Fach 2 no Planejador PCP — Carmen', w: 'c' },
      { id: '4-2', t: 'Configurar planilha de programação semanal de montagem da Fach 1 no Planejador PCP — Yuri', w: 'y' },
      { id: '4-3', t: 'Validar ciclos de programação sem alterações não autorizadas', w: 'eq' },
    ]
  },
  {
    id: 5, name: 'Apontamento simplificado', tasks: [
      { id: '5-0', t: 'Criar formulário Google Forms no celular: entrada em produção + conclusão + baixa de material', w: 'eq' },
      { id: '5-1', t: 'Treinar equipe: apenas 3 campos — OP, status (entrada/conclusão), quantidade', w: 'eq' },
      { id: '5-2', t: 'Realizar primeiro ciclo completo de apontamentos nas duas fábricas', w: 'eq' },
      { id: '5-3', t: 'Validar consistência: o que foi apontado bate com o que foi produzido e liberado', w: 'c' },
    ]
  },
  {
    id: 6, name: 'Kanban 220 — Fach 1', tasks: [
      { id: '6-0', t: 'Levantar os conjuntos 220 (séries 420, 520, 500) que entrarão no kanban', w: 'c' },
      { id: '6-1', t: 'Carmen define cartões, pontos de reposição e quantidades.', w: 'c' },
      { id: '6-2', t: 'Montar o quadro físico do kanban 220 na Fach 1', w: 'c' },
      { id: '6-3', t: 'Treinar Yuri para acionar os cartões.', w: 'y' },
      { id: '6-4', t: 'Realizar primeiro ciclo do kanban 220 em operação.', w: 'c' },
    ]
  },
  {
    id: 7, name: 'Indicadores e autonomia', tasks: [
      {
        id: '7-0', t: '5 indicadores configurados e preenchidos pela equipe sem apoio externo', w: 'eq',
        detailsHtml: `
        <div class="section" id="s7">
          <p style="font-size: 11px; font-weight: 800; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px;">Indicadores</p>
          
          <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 20px; margin-bottom: 24px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            <h3 style="font-size: 16px; font-weight: 700; color: var(--brand-dark); margin-bottom: 8px; margin-top: 0;">Princípio</h3>
            <p style="font-size: 13px; color: var(--text-2); margin: 0;">Todos os indicadores são calculados em planilha simples. O dado bruto é coletado durante as rotinas já existentes. Nenhum indicador exige mais de 10 minutos para ser calculado.</p>
          </div>

          <div style="background: white; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); overflow: hidden;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 16px 20px; border-bottom: 1px solid var(--border);">
              <div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--brand-dark); margin: 0 0 4px 0;">Pontualidade de entrega ao cliente</h4>
                <p style="font-size: 13px; color: var(--text-2); margin: 0;">% de pedidos concluídos no prazo acordado</p>
              </div>
              <div style="display: flex; gap: 8px; align-items: center; flex-shrink: 0;">
                <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #BE185D; background: #FCE7F3; padding: 4px 10px; border-radius: 4px;">Controle</span>
                <span style="font-size: 10px; font-weight: bold; color: #0369A1; background: #E0F2FE; border: 1px solid #BAE6FD; padding: 3px 12px; border-radius: 999px;">Daiane</span>
              </div>
            </div>
            <div style="padding: 20px;">
              <div style="background: #F8FAFC; border: 1px solid var(--border); border-radius: 6px; padding: 16px; margin-bottom: 20px;">
                <p style="font-size: 13px; color: var(--text); margin: 0 0 6px 0;"><strong style="font-weight: 700;">Cálculo:</strong> Pedidos concluídos no prazo ÷ Total de pedidos concluídos no período × 100</p>
                <p style="font-size: 13px; color: var(--text); margin: 0;"><strong style="font-weight: 700;">Exemplo:</strong> 7 de 10 pedidos concluídos no prazo = 70% · <strong style="font-weight: 700;">Meta inicial:</strong> acima de 80%</p>
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--text); width: 80px; flex-shrink: 0;">Coleta</span>
                  <span style="font-size: 13px; color: var(--text-2);">Reunião de fechamento semanal: quais pedidos foram encerrados e se ficaram dentro do prazo.</span>
                </div>
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--text); width: 80px; flex-shrink: 0;">Frequência</span>
                  <span style="font-size: 13px; color: var(--text-2);">Mensal — consolidado ao final de cada mês (não semanal, pois não há entrega toda semana)</span>
                </div>
              </div>
            </div>
            <div style="background: #F1F5F9; border-top: 1px solid var(--border); padding: 12px 20px; display: flex; flex-wrap: wrap; gap: 24px;">
              <span style="font-size: 12px; color: var(--text-2);">Ferramenta: <strong style="color: var(--text); font-weight: 600;">Planilha de pedidos</strong></span>
              <span style="font-size: 12px; color: var(--text-2);">Dado de entrada: <strong style="color: var(--text); font-weight: 600;">data de conclusão vs data prometida</strong></span>
            </div>
          </div>

          <div style="background: white; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); overflow: hidden;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 16px 20px; border-bottom: 1px solid var(--border);">
              <div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--brand-dark); margin: 0 0 4px 0;">Aderência à programação</h4>
                <p style="font-size: 13px; color: var(--text-2); margin: 0;">% de OPs executadas na semana em que foram programadas</p>
              </div>
              <div style="display: flex; gap: 8px; align-items: center; flex-shrink: 0;">
                <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #15803D; background: #DCFCE7; padding: 4px 10px; border-radius: 4px;">Programação</span>
                <span style="font-size: 10px; font-weight: bold; color: #C2410C; background: #FFEDD5; border: 1px solid #FED7AA; padding: 3px 12px; border-radius: 999px;">Carmen</span>
              </div>
            </div>
            <div style="padding: 20px;">
              <div style="background: #F8FAFC; border: 1px solid var(--border); border-radius: 6px; padding: 16px; margin-bottom: 20px;">
                <p style="font-size: 13px; color: var(--text); margin: 0 0 6px 0;"><strong style="font-weight: 700;">Cálculo:</strong> OPs executadas no prazo ÷ OPs programadas para a semana × 100</p>
                <p style="font-size: 13px; color: var(--text); margin: 0;"><strong style="font-weight: 700;">Exemplo:</strong> 8 de 10 OPs feitas na semana certa = 80% · <strong style="font-weight: 700;">Meta inicial:</strong> acima de 75%</p>
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--text); width: 80px; flex-shrink: 0;">Coleta</span>
                  <span style="font-size: 13px; color: var(--text-2);">Carmen compara o que foi programado na segunda com o que foi realmente executado até sexta.</span>
                </div>
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--text); width: 80px; flex-shrink: 0;">Frequência</span>
                  <span style="font-size: 13px; color: var(--text-2);">Semanal — calculado toda sexta no fechamento</span>
                </div>
              </div>
            </div>
            <div style="background: #F1F5F9; border-top: 1px solid var(--border); padding: 12px 20px; display: flex; flex-wrap: wrap; gap: 24px;">
              <span style="font-size: 12px; color: var(--text-2);">Ferramenta: <strong style="color: var(--text); font-weight: 600;">Planilha de programação</strong></span>
              <span style="font-size: 12px; color: var(--text-2);">Dado de entrada: <strong style="color: var(--text); font-weight: 600;">programado vs realizado</strong></span>
            </div>
          </div>

          <div style="background: white; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); overflow: hidden;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 16px 20px; border-bottom: 1px solid var(--border);">
              <div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--brand-dark); margin: 0 0 4px 0;">Cobertura de matéria-prima</h4>
                <p style="font-size: 13px; color: var(--text-2); margin: 0;">Quantas semanas o estoque atual cobre</p>
              </div>
              <div style="display: flex; gap: 8px; align-items: center; flex-shrink: 0;">
                <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #0369A1; background: #E0F2FE; padding: 4px 10px; border-radius: 4px;">Planejamento</span>
                <span style="font-size: 10px; font-weight: bold; color: #C2410C; background: #FFEDD5; border: 1px solid #FED7AA; padding: 3px 12px; border-radius: 999px;">Carmen</span>
              </div>
            </div>
            <div style="padding: 20px;">
              <div style="background: #F8FAFC; border: 1px solid var(--border); border-radius: 6px; padding: 16px; margin-bottom: 20px;">
                <p style="font-size: 13px; color: var(--text); margin: 0 0 6px 0;"><strong style="font-weight: 700;">Cálculo:</strong> Estoque atual (kg ou unidades) ÷ Consumo médio semanal</p>
                <p style="font-size: 13px; color: var(--text); margin: 0;"><strong style="font-weight: 700;">Exemplo:</strong> 240 kg em estoque ÷ 80 kg/semana = 3 semanas de cobertura · <strong style="font-weight: 700;">Meta mínima:</strong> acima de 1,5 semana</p>
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--text); width: 80px; flex-shrink: 0;">Coleta</span>
                  <span style="font-size: 13px; color: var(--text-2);">Levantamento físico toda sexta, durante a análise de MP (já é uma rotina existente).</span>
                </div>
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--text); width: 80px; flex-shrink: 0;">Frequência</span>
                  <span style="font-size: 13px; color: var(--text-2);">Semanal</span>
                </div>
              </div>
            </div>
            <div style="background: #F1F5F9; border-top: 1px solid var(--border); padding: 12px 20px; display: flex; flex-wrap: wrap; gap: 24px;">
              <span style="font-size: 12px; color: var(--text-2);">Ferramenta: <strong style="color: var(--text); font-weight: 600;">Planilha de análise de MP</strong></span>
            </div>
          </div>

          <div style="background: white; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); overflow: hidden;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 16px 20px; border-bottom: 1px solid var(--border);">
              <div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--brand-dark); margin: 0 0 4px 0;">Pedidos com compra em atraso</h4>
                <p style="font-size: 13px; color: var(--text-2); margin: 0;">Quantidade de OPs aguardando item comprado não recebido</p>
              </div>
              <div style="display: flex; gap: 8px; align-items: center; flex-shrink: 0;">
                <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #0369A1; background: #E0F2FE; padding: 4px 10px; border-radius: 4px;">Planejamento</span>
                <span style="font-size: 10px; font-weight: bold; color: #B95232; background: #FAEEDA; border: 1px solid #FDBA74; padding: 3px 12px; border-radius: 999px;">Yuri</span>
              </div>
            </div>
            <div style="padding: 20px;">
              <div style="background: #F8FAFC; border: 1px solid var(--border); border-radius: 6px; padding: 16px; margin-bottom: 20px;">
                <p style="font-size: 13px; color: var(--text); margin: 0 0 6px 0;"><strong style="font-weight: 700;">Cálculo:</strong> Número de OPs paradas por falta de item comprado</p>
                <p style="font-size: 13px; color: var(--text); margin: 0;"><strong style="font-weight: 700;">Meta:</strong> zero — qualquer número acima de zero exige ação imediata e comunicação a Daiane</p>
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--text); width: 80px; flex-shrink: 0;">Coleta</span>
                  <span style="font-size: 13px; color: var(--text-2);">Yuri verifica semanalmente as solicitações abertas com data vencida na planilha de compras.</span>
                </div>
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--text); width: 80px; flex-shrink: 0;">Frequência</span>
                  <span style="font-size: 13px; color: var(--text-2);">Semanal — apresentado na reunião de sexta</span>
                </div>
              </div>
            </div>
            <div style="background: #F1F5F9; border-top: 1px solid var(--border); padding: 12px 20px; display: flex; flex-wrap: wrap; gap: 24px;">
              <span style="font-size: 12px; color: var(--text-2);">Ferramenta: <strong style="color: var(--text); font-weight: 600;">Planilha de controle de compras</strong></span>
            </div>
          </div>

          <div style="background: white; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); overflow: hidden;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 16px 20px; border-bottom: 1px solid var(--border);">
              <div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--brand-dark); margin: 0 0 4px 0;">Volume de OPs encerradas</h4>
                <p style="font-size: 13px; color: var(--text-2); margin: 0;">Tendência de produtividade geral da fábrica</p>
              </div>
              <div style="display: flex; gap: 8px; align-items: center; flex-shrink: 0;">
                <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #BE185D; background: #FCE7F3; padding: 4px 10px; border-radius: 4px;">Controle</span>
                <span style="font-size: 10px; font-weight: bold; color: #0369A1; background: #E0F2FE; border: 1px solid #BAE6FD; padding: 3px 12px; border-radius: 999px;">Daiane</span>
              </div>
            </div>
            <div style="padding: 20px;">
              <div style="background: #F8FAFC; border: 1px solid var(--border); border-radius: 6px; padding: 16px; margin-bottom: 20px;">
                <p style="font-size: 13px; color: var(--text); margin: 0 0 6px 0;"><strong style="font-weight: 700;">Cálculo:</strong> Contagem de OPs encerradas na semana (Fach 1 e Fach 2 separadas)</p>
                <p style="font-size: 13px; color: var(--text); margin: 0;"><strong style="font-weight: 700;">Acompanhar:</strong> tendência — queda de uma semana para outra pede investigação de causa</p>
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--text); width: 80px; flex-shrink: 0;">Coleta</span>
                  <span style="font-size: 13px; color: var(--text-2);">Yuri e Carmen apontam diariamente. Daiane consolida na sexta.</span>
                </div>
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--text); width: 80px; flex-shrink: 0;">Frequência</span>
                  <span style="font-size: 13px; color: var(--text-2);">Semanal — consolidado por Daiane</span>
                </div>
              </div>
            </div>
            <div style="background: #F1F5F9; border-top: 1px solid var(--border); padding: 12px 20px; display: flex; flex-wrap: wrap; gap: 24px;">
              <span style="font-size: 12px; color: var(--text-2);">Ferramenta: <strong style="color: var(--text); font-weight: 600;">Planilha consolidada semanal</strong></span>
              <span style="font-size: 12px; color: var(--text-2);">Dado de entrada: <strong style="color: var(--text); font-weight: 600;">apontamento diário de OPs</strong></span>
            </div>
          </div>

        </div>
        `
      },
      { id: '7-1', t: 'Reunião de fechamento semanal (sexta) operando de forma autônoma — Daiane conduz', w: 'd' },
      { id: '7-2', t: 'Kanban 320 operando de forma estável com reposição sem emissão de OP', w: 'c' },
      { id: '7-3', t: 'Kanban 220 operando com Yuri acionando e Carmen gerenciando', w: 'c' },
      { id: '7-4', t: 'Pedidos com prazo de entrega prevista mais próximo do real', w: 'd' },
    ]
  }
];