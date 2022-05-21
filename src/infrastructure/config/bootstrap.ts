import { DATABASE_URI } from "@/infrastructure/config/const";
import { createDatabase } from "@/infrastructure/database/index";

export async function bootstrap() {
  // TODO: add dependency injection logic
  const db = await createDatabase({ DATABASE_URI });
  return db;
}
