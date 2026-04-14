// prisma.config.ts
export default {
  schema: "./prisma/schema.prisma",
  // Aqui é onde o Prisma 7 agora espera a URL para as migrações
  datasource: {
    url: process.env.DATABASE_URL,
  },
};