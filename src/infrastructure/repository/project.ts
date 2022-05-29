import { ILink } from "@/domain/entities/link";
import { IProject } from "@/domain/entities/project";
import { ProjectRepository } from "@/domain/projectRepository";
import { Database } from "@/infrastructure/database";
import { AppError } from "@/util/error/AppError";
import { HttpCode } from "@/util/HttpCode";

export function createProjectRepository(db: Database): ProjectRepository {
  return {
    async createProject(project, createLinkCallback) {
      return await db.transaction().execute(async (trx) => {
        const createdProject = await trx
          .insertInto("projects")
          .values({ ...project })
          .returningAll()
          .executeTakeFirst();

        console.log(`project #${createdProject?.id} created!!`);
        console.log(createdProject);

        const links = await createLinkCallback(trx, createdProject?.id as number);

        const result = { ...createdProject, links };
        return result as IProject & { links: ILink[] };
      });
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
