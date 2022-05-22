import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

import { Links, ProjectUsers, Users } from "@/domain/__generated__/psql";
import type { IProject } from "@/domain/entities/project";

export interface DatabaseSchema {
  users: Users;
  projects: IProject;
  project_users: ProjectUsers;
  links: Links;
}

export type Database = Kysely<DatabaseSchema>;

interface CreateDatabaseDeps {
  DATABASE_URI: string;
}

export function createDatabase({ DATABASE_URI }: CreateDatabaseDeps): Database {
  const db = new Kysely<DatabaseSchema>({
    // TODO: decouple database implementation
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: DATABASE_URI,
      }),
    }),
  });

  return db;
}
