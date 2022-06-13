import type { UserRepository } from "@/domain/userRepository";
import { PrismaDatabase } from "@/infrastructure/database";

export function createUserRepository(db: PrismaDatabase): UserRepository {
  return {
    async getUserByUserId(userId) {
      const ret = await db.user.findUnique({ where: { id: parseInt(userId) } });
      return ret ?? null;
    },
    async getUserByAuthUserId(authUserId: string) {
      const ret = await db.user.findUnique({ where: { id: parseInt(authUserId) } });
      return ret ?? null;
    },
    async createUser(params) {
      const user = await db.user.create({
        data: {
          ...params,
        },
      });
      return user;
    },
    async getUsersByName(name) {
      const users = await db.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: name,
              },
            },
            {
              name: {
                startsWith: name,
              },
            },
          ],
        },
      });
      return users;
    },
  };
}
