"use client";

import { useState } from "react";
import { createUser, updateUser, deleteUser } from "@/lib/actions/user.actions";
import Loading from "@/components/loading";
import ConfirmModal from "@/components/confirmModal";

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
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleOpenModal = async (user: User | null = null) => {
    setLoading(true);
    await wait(400); 
    setEditingUser(user);
    setIsModalOpen(true);
    setLoading(false);
  };

  const handleCloseModal = async () => {
    setLoading(true);
    await wait(300);
    setIsModalOpen(false);
    setEditingUser(null);
    setLoading(false);
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

    if (result.success) {
      await wait(300); 
      setIsModalOpen(false);
      setEditingUser(null);
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const handleRealDelete = async () => {
    if (!userToDelete) return;
    
    setLoading(true);
    const result = await deleteUser(userToDelete);
    
    if (result.success) {
      await wait(400);
      setUserToDelete(null);
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  return (
    <>
      <Loading show={loading} message="Processando..." />
      
      <ConfirmModal 
        show={!!userToDelete}
        title="Desativar Usuário"
        message="Tem certeza que deseja desativar este usuário? Ele perderá o acesso ao sistema imediatamente, mas seu histórico será mantido."
        confirmText="Sim, Desativar"
        cancelText="Cancelar"
        variant="warning"
        onHide={() => setUserToDelete(null)}
        onConfirm={handleRealDelete}
      />

      <div className="flex justify-end mb-6">
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[var(--brand-dark)] text-white font-black py-2.5 px-6 rounded-md uppercase text-[10px] tracking-[0.2em] hover:bg-[var(--primary)] transition-all shadow-sm"
        >
          + Novo Usuário
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
            <tr>
              <th className="px-6 py-4">Nome</th>
              <th className="px-6 py-4">E-mail Corporativo</th>
              <th className="px-6 py-4 text-center">Nível de Acesso</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {initialUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 font-bold text-[var(--brand-dark)]">{user.name}</td>
                <td className="px-6 py-4 text-slate-500 font-medium">{user.email}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                    user.isAdmin 
                    ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                    : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  }`}>
                    {user.isAdmin ? 'Admin' : 'Equipe'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-4">
                  <button 
                    onClick={() => handleOpenModal(user)}
                    className="text-[var(--primary)] hover:text-[var(--brand-dark)] text-[10px] font-black uppercase tracking-widest transition-colors inline-flex items-center gap-1"
                  >
                    Editar →
                  </button>
                  <button 
                    onClick={() => setUserToDelete(user.id)}
                    className="text-red-400 hover:text-red-600 text-[10px] font-black uppercase tracking-widest transition-colors inline-flex items-center gap-1"
                  >
                    Desativar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#141434]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-black text-[var(--brand-dark)] uppercase text-xs tracking-widest">
                {editingUser ? 'Editar Usuário' : 'Novo Cadastro'}
              </h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-900 font-bold text-lg leading-none transition-colors">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                <input 
                  name="name" 
                  defaultValue={editingUser?.name || ""}
                  className="w-full border border-slate-200 p-3 rounded-lg text-sm bg-slate-50 focus:bg-white outline-none focus:border-[var(--primary)] transition-all" 
                  required 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mail Corporativo</label>
                <input 
                  name="email" 
                  type="email" 
                  defaultValue={editingUser?.email || ""}
                  className="w-full border border-slate-200 p-3 rounded-lg text-sm bg-slate-50 focus:bg-white outline-none focus:border-[var(--primary)] transition-all" 
                  required 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {editingUser ? 'Nova Senha' : 'Senha Inicial'}
                </label>
                <input 
                  name="password" 
                  type="password" 
                  placeholder={editingUser ? "••••••••" : ""}
                  className="w-full border border-slate-200 p-3 rounded-lg text-sm bg-slate-50 focus:bg-white outline-none focus:border-[var(--primary)] transition-all" 
                  required={!editingUser} 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nível de Acesso</label>
                <select 
                  name="isAdmin" 
                  defaultValue={editingUser?.isAdmin ? "true" : "false"}
                  className="w-full border border-slate-200 p-3 rounded-lg text-sm bg-slate-50 outline-none focus:border-[var(--primary)] transition-all"
                >
                  <option value="false">Equipe Satiro</option>
                  <option value="true">Administrador</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-white border border-slate-200 text-slate-500 font-black py-3 rounded-lg uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-[var(--primary)] text-white font-black py-3 rounded-lg uppercase text-[10px] tracking-widest hover:brightness-110 shadow-lg shadow-orange-500/20 transition-all"
                >
                  Salvar Dados
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}