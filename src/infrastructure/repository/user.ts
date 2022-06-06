import type { UserRepository } from "@/domain/userRepository";
import { Database } from "@/infrastructure/database";

export function createUserRepository(db: Database): UserRepository {
  return {
    async getUserByUserId(userId: string) {
      const ret = await db.user.findUnique({ where: { id: parseInt(userId) } });
      return ret ?? null;
    },
    async getUserByAuthUserId(authUserId: string) {
      const ret = await db.user.findUnique({ where: { id: parseInt(authUserId) } });
      return ret ?? null;
    },
  };
}
