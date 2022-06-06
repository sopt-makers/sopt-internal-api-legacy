import { PrismaClient } from "@prisma/client";

import { Repository } from "@/domain";
import { createProjectRepository } from "@/infrastructure/repository/project";
import { createUserRepository } from "@/infrastructure/repository/user";

import { createLinkRepository } from "./link";

interface RepositoryDeps {
  db: PrismaClient;
}

export function createRepository({ db }: RepositoryDeps): Repository {
  return {
    user: createUserRepository(db),
    project: createProjectRepository(db),
    link: createLinkRepository(db),
  };
}
