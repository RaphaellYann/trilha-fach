"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

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