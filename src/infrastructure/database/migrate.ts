import dotenv from "dotenv-safe";
dotenv.config();

import { promises } from "fs";
import { FileMigrationProvider, Kysely, Migrator, PostgresDialect } from "kysely";
import * as path from "path";
import { Pool } from "pg";

import { DatabaseSchema } from ".";

async function migrateToLatest() {
  const db = new Kysely<DatabaseSchema>({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: "localhost",
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs: promises,
      path,
      migrationFolder: path.join(__dirname, "migrations"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
