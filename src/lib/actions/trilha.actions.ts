"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

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

export async function toggleTaskStatus(taskId: string, currentStatus: boolean) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Acesso negado." };

    const userId = session.user.id;
    const newStatus = !currentStatus;

    await prisma.taskProgress.upsert({
      where: { taskId: taskId },
      update: { completed: newStatus, userId: userId },
      create: { taskId: taskId, completed: newStatus, userId: userId },
    });

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
    return { success: false, error: "Erro ao processar banco." };
  }
}