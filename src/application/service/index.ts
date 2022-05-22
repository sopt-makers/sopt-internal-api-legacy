import type { Repository } from "@/domain";

import { createProjectService, ProjectService } from "./project";
import { createUserService, UserService } from "./user";

export interface Services {
  hello(): string;
  user: UserService;
  project: ProjectService;
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
    project: createProjectService({ repository }),
  };
}
