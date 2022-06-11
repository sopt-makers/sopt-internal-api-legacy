import { User } from "@prisma/client";

import type { Repository } from "@/domain";

export interface UserService {
  getUser: (id: string) => Promise<User | null>;
}

interface CreateServicesDeps {
  repository: Repository;
}

export function createUserService({ repository }: CreateServicesDeps): UserService {
  repository;

  return {
    async getUser(id: string) {
      const user = await repository.user.getUserByUserId(id);
      return user;
    },
  };
}
