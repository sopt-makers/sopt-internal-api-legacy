import { ProjectRepository } from "@/domain/projectRepository";
import { Database } from "@/infrastructure/database";
import { AppError } from "@/util/error/AppError";
import { HttpCode } from "@/util/HttpCode";

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
    async getProject(id) {
      const result = await db.selectFrom("projects").selectAll().where("id", "=", id).executeTakeFirst();
      if (!result) {
        throw new AppError("NOT_FOUND", HttpCode.NOT_FOUND, "프로젝트가 존재하지 않습니다.");
      }
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
      if (!result) {
        throw new AppError("NOT_FOUND", HttpCode.NOT_FOUND, "프로젝트가 존재하지 않습니다.");
      }
      return result;
    },
    async deleteProject(id) {
      const result = await db.deleteFrom("projects").where("id", "=", id).returning("id").executeTakeFirst();
      if (!result) {
        throw new AppError("NOT_FOUND", HttpCode.NOT_FOUND, "프로젝트가 존재하지 않습니다.");
      }
      return result;
    },
  };
}
