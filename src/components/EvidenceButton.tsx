"use client";

import { CldUploadWidget } from 'next-cloudinary';
import { addEvidence } from "@/lib/actions/evidence.actions";
import { useState } from "react";

// 1. A interface agora aceita o onUploadSuccess para não dar erro no build
interface EvidenceButtonProps {
  taskId: string;
  hasEvidence: boolean;
  onUploadSuccess?: () => void;
}

// 2. Recebendo a prop aqui
export default function EvidenceButton({ taskId, hasEvidence, onUploadSuccess }: EvidenceButtonProps) {
  const [loading, setLoading] = useState(false);

  return (
    <CldUploadWidget 
      uploadPreset="ml_default" // O mesmo que você criou no Cloudinary
      onSuccess={async (result: any) => {
        setLoading(true);
        const { secure_url, original_filename } = result.info;
        
        // Salva a URL no Neon
        await addEvidence(taskId, secure_url, original_filename);
        
        // 3. Aciona o "olhinho" na mesma hora na tela da Trilha
        if (onUploadSuccess) {
          onUploadSuccess();
        }
        
        setLoading(false);
      }}
    >
      {({ open }) => (
        <button
          onClick={(e) => {
            e.stopPropagation(); // REGRA SÊNIOR: Impede que o clique marque a tarefa
            open();
          }}
          disabled={loading}
          title={hasEvidence ? "Substituir evidência" : "Anexar evidência"}
          className={`group relative p-2 rounded-full transition-all flex items-center justify-center ${
            hasEvidence 
              ? "bg-[var(--primary-dim)] text-[var(--primary)] border border-[var(--primary-border)]" 
              : "bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-200"
          } ${loading ? "animate-pulse" : "hover:scale-110"}`}
        >
          {/* Ícone de Clipe */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>

          {/* Badge de "Check" se já houver anexo */}
          {hasEvidence && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </button>
      )}
    </CldUploadWidget>
  );
}