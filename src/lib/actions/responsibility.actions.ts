"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getResponsibilities() {
  try {
    const resp = await prisma.roleResponsibility.findMany({ orderBy: { order: 'asc' } });
    const grouped: Record<string, { id: string, text: string }[]> = { c: [], d: [], y: [] };
    resp.forEach(r => {
      if (grouped[r.roleKey]) grouped[r.roleKey].push({ id: r.id, text: r.text });
    });
    return grouped;
  } catch (error) {
    return { c: [], d: [], y: [] };
  }
}

export async function addResponsibility(roleKey: string, text: string) {
  try {
    const session = await auth();
    if (!session?.user) return { success: false, error: "Acesso negado." };

    const count = await prisma.roleResponsibility.count({ where: { roleKey } });
    await prisma.roleResponsibility.create({
      data: { roleKey, text, order: count }
    });

    revalidatePath("/trilha");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao salvar." };
  }
}

export async function updateResponsibility(id: string, text: string) {
  try {
    const session = await auth();
    if (!session?.user) return { success: false, error: "Acesso negado." };

    await prisma.roleResponsibility.update({
      where: { id },
      data: { text }
    });

    revalidatePath("/trilha");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar." };
  }
}

export async function deleteResponsibility(id: string) {
  try {
    const session = await auth();
    if (!session?.user) return { success: false, error: "Acesso negado." };

    await prisma.roleResponsibility.delete({ where: { id } });
    revalidatePath("/trilha");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao deletar." };
  }
}