import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPass = process.env.ADMIN_PASS;
  const adminName = process.env.ADMIN_NAME;


  if (!adminEmail || !adminPass || !adminName) {
    throw new Error(
      "Falha no Seed: Variáveis ADMIN_EMAIL, ADMIN_PASS ou ADMIN_NAME não encontradas no .env"
    );
  }

  console.log("🌱 Iniciando o seed do banco de dados...");

  const hashedPassword = await bcrypt.hash(adminPass, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      password: hashedPassword,
      isAdmin: true,
    },
  });

  console.log(`✅ Usuário Admin garantido: ${admin.email} (ID: ${admin.id})`);
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });