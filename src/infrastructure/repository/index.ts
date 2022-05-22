import { Repository } from "@/domain";
import { Database } from "@/infrastructure/database";
import { createProjectRepository } from "@/infrastructure/repository/project";
import { createUserRepository } from "@/infrastructure/repository/user";

interface RepositoryDeps {
  db: Database;
}

export function createRepository({ db }: RepositoryDeps): Repository {
  return {
    user: createUserRepository(db),
    project: createProjectRepository(db),
  };
}
