import dotenv from "dotenv-safe";
import { FileMigrationProvider, Kysely, Migrator, PostgresDialect } from "kysely";
import path from "path";
dotenv.config();

import { DatabaseSchema } from ".";

async function migrateToLatest() {
  const db = new Kysely<DatabaseSchema>({
    dialect: new PostgresDialect({
      host: "localhost",
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider(path.resolve(__dirname, "migrations")),
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
