"use client";

import { useState, useEffect } from "react";
import { getResponsibilities, addResponsibility, deleteResponsibility } from "@/lib/actions";

const PROFILES = {
  c: { name: 'Carmen', role: 'Analista PCP · Fach 2', badge: 'PCP FACH 2', bdgColor: 'bg-[#EEEDFE] text-[#5B50D6]', init: 'CA' },
  d: { name: 'Daiane', role: 'Líder PCP · Fach 1', badge: 'PCP FACH 1', bdgColor: 'bg-[#E6F1FB] text-[#2A71AA]', init: 'DA' },
  y: { name: 'Yuri', role: 'Analista PCP · Fach 1', badge: 'PCP FACH 1', bdgColor: 'bg-[#FAEEDA] text-[#B95232]', init: 'YU' }
};

export default function EditableResponsibilities() {
  const [data, setData] = useState<Record<string, {id: string, text: string}[]>>({ c: [], d: [], y: [] });
  const [loading, setLoading] = useState(true);
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [newText, setNewText] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getResponsibilities();
    setData(res);
    setLoading(false);
  };

  const handleAdd = async (roleKey: string) => {
    if (!newText.trim()) return;
    setLoading(true);
    await addResponsibility(roleKey, newText);
    setNewText("");
    setAddingTo(null);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remover esta responsabilidade?")) return;
    setLoading(true);
    await deleteResponsibility(id);
    await loadData();
  };

  if (loading) return <div className="p-4 text-center text-[var(--text-3)] text-xs font-bold uppercase tracking-widest">Carregando...</div>;

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
              <div key={item.id} className="flex items-center justify-between group py-1">
                <div className="flex items-center gap-3">
                  <span className="text-[var(--text-3)]">⠇</span>
                  <span className="text-[13px] text-[var(--text)]">{item.text}</span>
                </div>
                <button onClick={() => handleDelete(item.id)} className="text-[var(--text-3)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Adicionar Novo */}
          {addingTo === key ? (
            <div className="flex gap-2 items-center border border-[var(--border)] rounded p-1 pl-3 bg-[var(--surface-2)]">
              <input 
                autoFocus
                type="text" 
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd(key)}
                className="flex-1 bg-transparent text-[13px] outline-none text-[var(--text)]"
                placeholder="Digite a responsabilidade..."
              />
              <button onClick={() => handleAdd(key)} className="px-3 py-1 bg-[var(--primary)] text-white text-xs font-bold rounded">SALVAR</button>
              <button onClick={() => setAddingTo(null)} className="px-2 py-1 text-[var(--text-3)] text-xs font-bold hover:text-[var(--text)]">CANCELAR</button>
            </div>
          ) : (
            <button 
              onClick={() => setAddingTo(key)}
              className="text-[13px] font-bold text-[var(--text-3)] hover:text-[var(--primary)] transition-colors w-full text-left py-2 border border-dashed border-[var(--border)] rounded"
            >
              + Adicionar nova responsabilidade para {profile.name}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}