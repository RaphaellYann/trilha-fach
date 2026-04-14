"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { hashPassword } from "./password";

// --- GESTÃO DA TRILHA COM AUDITORIA ---
export async function toggleTaskStatus(taskId: string, currentStatus: boolean) {
  try {
    const session = await auth();
    
    // Trava de Segurança: Se não houver ID na sessão, interrompe aqui.
    // O banco de dados nunca será tocado se o usuário não estiver logado.
    if (!session?.user?.id) {
      return { success: false, error: "Acesso negado: faça login para salvar." };
    }

    const userId = session.user.id;
    const newStatus = !currentStatus;

    // Atualiza o progresso
    await prisma.taskProgress.upsert({
      where: { taskId: taskId },
      update: { completed: newStatus, userId: userId },
      create: { taskId: taskId, completed: newStatus, userId: userId },
    });

    // Registra auditoria
    await prisma.auditLog.create({
      data: {
        taskId: taskId,
        action: newStatus ? "CHECK" : "UNCHECK",
        userId: userId
      }
    });

    revalidatePath("/trilha");
    revalidatePath("/admin/auditoria");
    return { success: true };
  } catch (error) {
    console.error("Erro toggleTaskStatus:", error);
    return { success: false, error: "Erro interno ao processar banco." };
  }
}

// --- CONSULTA DE LOGS (RESTRITO A ADMIN) ---
export async function getAuditLogs() {
  try {
    const session = await auth();
    if (!(session?.user as any)?.isAdmin) return [];

    return await prisma.auditLog.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 50
    });
  } catch (error) {
    return [];
  }
}

// --- GESTÃO DE USUÁRIOS (RESTRITO A ADMIN) ---
export async function createUser(formData: FormData) {
  try {
    const session = await auth();
    if (!(session?.user as any)?.isAdmin) {
      return { success: false, error: "Ação permitida apenas para administradores." };
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const isAdmin = formData.get("isAdmin") === "true";

    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: { name, email, password: hashedPassword, isAdmin },
    });
    
    revalidatePath("/admin/usuarios");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao criar usuário ou e-mail duplicado." };
  }
}

export async function getUsers() {
  try {
    const session = await auth();
    if (!(session?.user as any)?.isAdmin) return [];

    return await prisma.user.findMany({
      select: { id: true, name: true, email: true, isAdmin: true },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    return [];
  }
}

// --- PÚBLICO (LEITURA) ---
export async function getAllTaskStatuses() {
  try {
    const tasks = await prisma.taskProgress.findMany();
    const statusMap: Record<string, boolean> = {};
    tasks.forEach((t) => { statusMap[t.taskId] = t.completed; });
    return statusMap;
  } catch (error) {
    return {};
  }
}