import type { Repository } from "@/domain";

import { createUserService, UserService } from "./user";

export interface Services {
  hello(): string;
  user: UserService;
}

interface CreateServicesDeps {
  repository: Repository;
}

export function createServices({ repository }: CreateServicesDeps): Services {
  repository;

  return {
    hello() {
      return "world";
    },
    user: createUserService({ repository }),
  };
}
