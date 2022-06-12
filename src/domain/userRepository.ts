import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  getUserByUserId(userId: string): Promise<User | null>;
  getUserByAuthUserId(authUserId: string): Promise<User | null>;
  createUser(params: Prisma.UserCreateArgs["data"]): Promise<User>;
}
