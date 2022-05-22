import { ProjectRepository } from "@/domain/projectRepository";
import { Database } from "@/infrastructure/database";

export function createProjectRepository(db: Database): ProjectRepository {
  return {
    async createProject(project) {
      const result = await db
        .insertInto("projects")
        .values({ ...project })
        .returningAll()
        .executeTakeFirst();
      return result;
    },
    async listProjects() {
      const result = await db.selectFrom("projects").selectAll().execute();
      return result;
    },
    async updateProject(id, params) {
      const result = await db
        .updateTable("projects")
        .set(params)
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirst();
      return result;
    },
    async deleteProject(id) {
      const result = await db.deleteFrom("projects").where("id", "=", id).returning("id").executeTakeFirst();
      return result;
    },
  };
}
