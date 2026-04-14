"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

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