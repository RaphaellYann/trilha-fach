"use client";

import { useState, useEffect } from "react";
import { getResponsibilities, addResponsibility, deleteResponsibility, updateResponsibility } from "@/lib/actions";

const PROFILES = {
  c: { name: 'Carmen', role: 'Analista PCP · Fach 2', badge: 'PCP FACH 2', bdgColor: 'bg-[#EEEDFE] text-[#5B50D6]', init: 'CA' },
  d: { name: 'Daiane', role: 'Líder PCP · Fach 1', badge: 'PCP FACH 1', bdgColor: 'bg-[#E6F1FB] text-[#2A71AA]', init: 'DA' },
  y: { name: 'Yuri', role: 'Analista PCP · Fach 1', badge: 'PCP FACH 1', bdgColor: 'bg-[#FAEEDA] text-[#B95232]', init: 'YU' }
};

export default function EditableResponsibilities() {
  const [data, setData] = useState<Record<string, {id: string, text: string}[]>>({ c: [], d: [], y: [] });
  const [initialLoading, setInitialLoading] = useState(true);
  
  // Estados para Adicionar
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [newText, setNewText] = useState("");
  
  // Estados para Editar
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getResponsibilities();
    setData(res);
    setInitialLoading(false); // Só usamos o loading na primeira vez que a página abre
  };

  const handleAdd = async (roleKey: string) => {
    if (!newText.trim()) return;
    const textToSave = newText;
    
    // UI Otimista: Limpa o input na hora sem piscar a tela
    setNewText("");
    setAddingTo(null);
    
    // Salva no banco silenciosamente
    await addResponsibility(roleKey, textToSave);
    await loadData();
  };

  const handleUpdate = async (id: string, textToSave: string) => {
    if (!textToSave.trim()) {
      setEditingId(null);
      return;
    }
    
    // UI Otimista: Fecha o input e atualiza o texto na tela IMEDIATAMENTE
    setEditingId(null);
    setData(prev => {
      const newData = { ...prev };
      Object.keys(newData).forEach(key => {
        const itemIndex = newData[key].findIndex(i => i.id === id);
        if (itemIndex > -1) newData[key][itemIndex].text = textToSave;
      });
      return newData;
    });

    // Envia a requisição para o banco de dados em segundo plano
    await updateResponsibility(id, textToSave);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remover esta responsabilidade?")) return;
    
    // UI Otimista: Remove da tela imediatamente
    setData(prev => {
      const newData = { ...prev };
      Object.keys(newData).forEach(key => {
        newData[key] = newData[key].filter(i => i.id !== id);
      });
      return newData;
    });

    // Deleta no banco silenciosamente
    await deleteResponsibility(id);
  };

  // Loader apenas na montagem inicial
  if (initialLoading) return <div className="p-4 text-center text-[var(--text-3)] text-xs font-bold uppercase tracking-widest">Carregando dados...</div>;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[11px] font-bold text-[var(--text-3)] uppercase tracking-widest mb-2">Responsabilidades Editáveis</p>
      
      {Object.entries(PROFILES).map(([key, profile]) => (
        <div key={key} className="bg-white border border-[var(--border)] rounded-lg p-4 shadow-sm">
          
          {/* Cabeçalho do Perfil */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${profile.bdgColor}`}>
              {profile.init}
            </div>
            <div>
              <h4 className="font-bold text-[var(--brand-dark)] m-0">{profile.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-[var(--text-2)]">{profile.role}</span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${profile.bdgColor}`}>
                  {profile.badge}
                </span>
              </div>
            </div>
          </div>

          {/* Lista de Responsabilidades */}
          <div className="flex flex-col gap-2 mb-4">
            {data[key]?.map((item) => (
              <div key={item.id} className="flex items-center justify-between group py-1 min-h-[32px]">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-[var(--text-3)] cursor-grab">⠇</span>
                  
                  {/* Lógica de Alternância: Texto vs Input */}
                  {editingId === item.id ? (
                    <input 
                      autoFocus
                      className="flex-1 bg-[var(--surface-2)] border border-[var(--primary)] rounded px-2 py-0.5 text-[13px] outline-none"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onBlur={() => handleUpdate(item.id, editingText)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault(); // Evita conflitos de evento
                          handleUpdate(item.id, editingText);
                        }
                      }}
                    />
                  ) : (
                    <span 
                      onClick={() => { setEditingId(item.id); setEditingText(item.text); }}
                      className="text-[13px] text-[var(--text)] cursor-text hover:text-[var(--primary)] transition-colors"
                      title="Clique para editar"
                    >
                      {item.text}
                    </span>
                  )}
                </div>
                
                {/* Botão de Excluir */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pl-2">
                  <button onClick={() => handleDelete(item.id)} className="text-[var(--text-3)] hover:text-red-500 p-1">
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Adicionar Novo */}
          {addingTo === key ? (
            <div className="flex gap-2 items-center border border-[var(--border)] rounded p-1 pl-3 bg-[var(--surface-2)] animate-in fade-in duration-200">
              <input 
                autoFocus
                type="text" 
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAdd(key);
                  }
                }}
                className="flex-1 bg-transparent text-[13px] outline-none text-[var(--text)]"
                placeholder="Digite a nova responsabilidade..."
              />
              <button onClick={() => handleAdd(key)} className="px-3 py-1 bg-[var(--primary)] text-white text-xs font-bold rounded">SALVAR</button>
              <button onClick={() => setAddingTo(null)} className="px-2 py-1 text-[var(--text-3)] text-xs font-bold hover:text-[var(--text)]">✕</button>
            </div>
          ) : (
            <button 
              onClick={() => setAddingTo(key)}
              className="text-[12px] font-bold text-[var(--text-3)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all w-full text-left py-2 px-4 border border-dashed border-[var(--border)] rounded bg-gray-50/50"
            >
              + Adicionar nova responsabilidade para {profile.name}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}