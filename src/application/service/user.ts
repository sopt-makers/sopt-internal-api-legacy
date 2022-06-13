import { Prisma, User } from "@prisma/client";

import type { Repository } from "@/domain";

export interface UserService {
  getUser: (id: string) => Promise<User | null>;
  createUser: (params: Prisma.UserCreateArgs["data"]) => Promise<User>;
  getUsersByName: (name: string) => Promise<User[] | null>;
}

interface CreateServicesDeps {
  repository: Repository;
}

export function createUserService({ repository }: CreateServicesDeps): UserService {
  return {
    async getUser(id) {
      const user = await repository.user.getUserByUserId(id);
      return user;
    },
    async createUser(params) {
      const user = await repository.user.createUser(params);
      return user;
    },
    async getUsersByName(name) {
      const users = await repository.user.getUsersByName(name);
      return users;
    },
  };
}
