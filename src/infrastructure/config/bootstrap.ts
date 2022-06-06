import { createDatabase } from "@/infrastructure/database/index";

export async function bootstrap() {
  const db = await createDatabase();
  return db;
}
