import type { UserRepository } from "@/domain/userRepository";
import { Database } from "@/infrastructure/database";

export function createUserRepository(db: Database): UserRepository {
  return {
    async getUserByUserId(userId: string) {
      const ret = await db.selectFrom("users").where("id", "=", parseInt(userId)).selectAll().executeTakeFirst();
      return ret ?? null;
    },
    async getUserByAuthUserId(authUserId: string) {
      const ret = await db
        .selectFrom("users")
        .where("auth_user_id", "=", parseInt(authUserId))
        .selectAll()
        .executeTakeFirst();
      return ret ?? null;
    },
  };
}
