"use client";

import { getTaskEvidences } from "@/lib/actions/evidence.actions";
import { useState } from "react";

export default function EvidenceView({ taskId }: { taskId: string }) {
  const [loading, setLoading] = useState(false);

  const handleView = async () => {
    setLoading(true);
    const docs = await getTaskEvidences(taskId);
    
    if (docs.length > 0) {
      // Abre a evidência mais recente em uma nova aba
      window.open(docs[0].fileUrl, "_blank");
    } else {
      alert("Arquivo não encontrado.");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // REGRA SÊNIOR: Impede de marcar o check da tarefa
        handleView();
      }}
      disabled={loading}
      title="Ver/Baixar Evidência"
      className={`p-1.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 hover:bg-[var(--primary-dim)] hover:text-[var(--primary)] transition-all ${
        loading ? 'animate-pulse' : ''
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </button>
  );
}