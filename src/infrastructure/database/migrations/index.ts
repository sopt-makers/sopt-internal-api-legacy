import { Kysely, sql } from "kysely";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("projects")
    .addColumn("id", "serial", (col) => col.primaryKey().notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("generation", "integer")
    .addColumn("category", "text", (col) => col.notNull())
    .addColumn("service_type", sql`text[]`, (col) => col.notNull())
    .addColumn("start_at", "timestamp", (col) => col.notNull())
    .addColumn("end_at", "timestamp")
    .addColumn("is_available", "boolean")
    .addColumn("is_founding", "boolean")
    .addColumn("summary", "text", (col) => col.notNull())
    .addColumn("detail", "text", (col) => col.notNull())
    .addColumn("thumbnail_image", "text", (col) => col.notNull())
    .addColumn("images", sql`text[]`)
    .execute();

  await db.schema
    .createTable("links")
    .addColumn("id", "serial", (col) => col.primaryKey().notNull())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("url", "text", (col) => col.notNull())
    .addColumn("project_id", "integer", (col) => col.references("projects.id").notNull())
    .execute();

  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey().notNull())
    .addColumn("auth_user_id", "integer", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("project_users")
    .addColumn("id", "serial", (col) => col.primaryKey().notNull())
    .addColumn("project_id", "integer", (col) => col.references("projects.id").notNull())
    .addColumn("user_id", "integer", (col) => col.references("users.id").notNull())
    .addColumn("role", "text")
    .addColumn("description", "text")
    .execute();

  // TODO: create index
  // await db.schema.createIndex("pet_owner_id_index").on("pet").column("owner_id").execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("projects").execute();
  await db.schema.dropTable("links").execute();
  await db.schema.dropTable("users").execute();
  await db.schema.dropTable("project_users").execute();
}
