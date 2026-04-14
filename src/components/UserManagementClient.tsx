// src/components/UserManagementClient.tsx
"use client";

import { useState } from "react";
import { createUser, updateUser } from "@/lib/actions/user.actions";

type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

export default function UserManagementClient({ initialUsers }: { initialUsers: User[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const openCreateModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    let result;
    if (editingUser) {
      result = await updateUser(editingUser.id, formData);
    } else {
      result = await createUser(formData);
    }

    setLoading(false);

    if (result.success) {
      closeModal();
    } else {
      alert(result.error);
    }
  };

  return (
    <>
      {/* Botão Superior */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={openCreateModal}
          className="bg-[var(--brand-dark)] text-white font-bold py-2 px-6 rounded uppercase text-xs tracking-widest hover:bg-[var(--primary)] transition-colors shadow-sm"
        >
          + Novo Usuário
        </button>
      </div>

      {/* Tabela de Usuários */}
      <div className="bg-white border border-[var(--border)] rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--surface-2)] border-b border-[var(--border)] text-[var(--text-3)] uppercase text-[10px] font-bold">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Perfil</th>
              <th className="px-4 py-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {initialUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-[var(--text)]">{user.name}</td>
                <td className="px-4 py-3 text-[var(--text-2)]">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    user.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {user.isAdmin ? 'Admin' : 'Equipe'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button 
                    onClick={() => openEditModal(user)}
                    className="text-[var(--primary)] hover:text-[var(--brand-dark)] text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
            {initialUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[var(--text-3)] text-sm">
                  Nenhum usuário cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Interativo */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-[var(--surface-2)] px-6 py-4 border-b border-[var(--border)] flex justify-between items-center">
              <h2 className="font-bold text-[var(--brand-dark)] uppercase text-xs tracking-widest">
                {editingUser ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}
              </h2>
              <button onClick={closeModal} className="text-[var(--text-3)] hover:text-[var(--text)] font-bold text-lg leading-none">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest">Nome Completo</label>
                <input 
                  name="name" 
                  defaultValue={editingUser?.name || ""}
                  className="border border-[var(--border)] p-2.5 rounded text-sm outline-none focus:border-[var(--primary)] bg-slate-50 focus:bg-white transition-colors" 
                  required 
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest">E-mail</label>
                <input 
                  name="email" 
                  type="email" 
                  defaultValue={editingUser?.email || ""}
                  className="border border-[var(--border)] p-2.5 rounded text-sm outline-none focus:border-[var(--primary)] bg-slate-50 focus:bg-white transition-colors" 
                  required 
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest">
                  {editingUser ? 'Nova Senha (deixe em branco para manter a atual)' : 'Senha Inicial'}
                </label>
                <input 
                  name="password" 
                  type="password" 
                  placeholder={editingUser ? "••••••••" : ""}
                  className="border border-[var(--border)] p-2.5 rounded text-sm outline-none focus:border-[var(--primary)] bg-slate-50 focus:bg-white transition-colors" 
                  required={!editingUser} 
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest">Perfil de Acesso</label>
                <select 
                  name="isAdmin" 
                  defaultValue={editingUser?.isAdmin ? "true" : "false"}
                  className="border border-[var(--border)] p-2.5 rounded text-sm outline-none focus:border-[var(--primary)] bg-slate-50 focus:bg-white transition-colors"
                >
                  <option value="false">Usuário Padrão</option>
                  <option value="true">Administrador</option>
                </select>
              </div>
              
              <div className="mt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-white border border-[var(--border)] text-[var(--text-2)] font-bold py-2.5 rounded uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-[var(--primary)] text-white font-bold py-2.5 rounded uppercase text-xs tracking-widest hover:bg-[var(--brand-dark)] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}