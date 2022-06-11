import { PrismaClient } from "@prisma/client";

export type PrismaDatabase = PrismaClient;

export function createDatabase() {
  const prisma = new PrismaClient();
  return prisma;
}
