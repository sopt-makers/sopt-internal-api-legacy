import { PrismaClient } from "@prisma/client";

export type Database = PrismaClient;

export function createDatabase() {
  const prisma = new PrismaClient();
  return prisma;
}
