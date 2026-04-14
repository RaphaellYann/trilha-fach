"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { hashPassword } from "../password";

export async function getUsers() {
  try {
    const session = await auth();
    // Ajuste de tipo aqui
    if (!(session?.user as any)?.isAdmin) return [];

    return await prisma.user.findMany({
      where: { isActive: true }, 
      select: { id: true, name: true, email: true, isAdmin: true },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    return [];
  }
}

export async function createUser(formData: FormData) {
  try {
    const session = await auth();
    if (!(session?.user as any)?.isAdmin) {
      return { success: false, error: "Não autorizado." };
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const isAdmin = formData.get("isAdmin") === "true";

    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: { name, email, password: hashedPassword, isAdmin, isActive: true },
    });

    revalidatePath("/admin/usuarios");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao criar usuário ou e-mail duplicado." };
  }
}

export async function updateUser(id: string, formData: FormData) {
  try {
    const session = await auth();
    if (!(session?.user as any)?.isAdmin) {
      return { success: false, error: "Não autorizado." };
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const isAdmin = formData.get("isAdmin") === "true";

    const dataToUpdate: any = { name, email, isAdmin };
    
    // Regra Sênior: Só altera a senha se o campo não estiver vazio
    if (password && password.trim() !== "") {
      dataToUpdate.password = await hashPassword(password);
    }

    await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });
    
    revalidatePath("/admin/usuarios");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar usuário." };
  }
}

export async function deleteUser(id: string) {
  try {
    const session = await auth();
    if (!(session?.user as any)?.isAdmin) {
      return { success: false, error: "Não autorizado." };
    }

    // Corrigindo o erro de tipagem do ID
    if ((session?.user as any)?.id === id) {
      return { success: false, error: "Impossível desativar a própria conta." };
    }

    await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
    
    revalidatePath("/admin/usuarios");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao desativar usuário." };
  }
}
