"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * Registra uma nova evidência no banco e gera log de auditoria
 */
export async function addEvidence(taskId: string, fileUrl: string, fileName: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Não autorizado." };

    await prisma.taskEvidence.create({
      data: {
        taskId,
        fileUrl,
        fileName,
        userId: session.user.id
      }
    });

    // Registra na auditoria que uma evidência foi anexada
    await prisma.auditLog.create({
      data: {
        taskId,
        action: `ANEXOU: ${fileName}`,
        userId: session.user.id
      }
    });

    revalidatePath("/trilha");
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar evidência:", error);
    return { success: false, error: "Erro ao registrar anexo no banco." };
  }
}

/**
 * Busca todas as evidências de uma tarefa específica
 */
export async function getTaskEvidences(taskId: string) {
  try {
    return await prisma.taskEvidence.findMany({
      where: { taskId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true } } // Traz o nome de quem anexou
      }
    });
  } catch (error) {
    console.error("Erro ao buscar evidências:", error);
    return [];
  }
}

/**
 * Retorna um mapa de status: { "1-1": true, "2-0": true }
 * Essencial para o "olhinho" ou "clipe" saberem se brilham sem 
 * precisar fazer uma query para cada linha da tabela (performance).
 */
export async function getEvidencesStatus() {
  try {
    const evidences = await prisma.taskEvidence.findMany({
      select: { taskId: true },
      distinct: ['taskId'] 
    });
    
    return evidences.reduce((acc, curr) => {
      acc[curr.taskId] = true;
      return acc;
    }, {} as Record<string, boolean>);
  } catch (error) {
    console.error("Erro ao carregar mapa de evidências:", error);
    return {};
  }
}