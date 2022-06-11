import type { Repository } from "@/domain";

import { createProjectService, ProjectService } from "./project";
import { createUserService, UserService } from "./user";

export interface Services {
  user: UserService;
  project: ProjectService;
}

interface CreateServicesDeps {
  repository: Repository;
}

export function createServices({ repository }: CreateServicesDeps): Services {
  repository;

  return {
    user: createUserService({ repository }),
    project: createProjectService({ repository }),
  };
}
