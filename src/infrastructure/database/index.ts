import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

import { Links, Projects, ProjectUsers, Users } from "@/domain/__generated__/psql";

export interface DatabaseSchema {
  users: Users;
  projects: Projects;
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
