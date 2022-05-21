import { Repository } from "@/domain";
import { Database } from "@/infrastructure/database";
import { createUserRepository } from "@/infrastructure/repository/user";

interface RepositoryDeps {
  db: Database;
}

export function createRepository({ db }: RepositoryDeps): Repository {
  return {
    user: createUserRepository(db),
  };
}
