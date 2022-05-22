import type { Repository } from "@/domain";
import type { Users } from "@/domain/__generated__/psql";

export interface UserService {
  getUser: (id: string) => Promise<Users | null>;
}

interface CreateServicesDeps {
  repository: Repository;
}

export function createUserService({ repository }: CreateServicesDeps): UserService {
  repository;

  return {
    async getUser(id: string) {
      const user = await repository.user.getUserByAuthUserId(id);
      return user;
    },
  };
}
