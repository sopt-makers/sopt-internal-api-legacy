import { ProjectRepository } from "@/domain/projectRepository";
import { Database } from "@/infrastructure/database";

export function createProjectRepository(db: Database): ProjectRepository {
  return {
    async createProject(params) {
      const project = await db.project.create({
        data: {
          ...params,
          links: {
            create: params.links,
          },
        },
      });

      return project;
    },
    async getProject(id) {
      const project = await db.project.findUnique({
        where: {
          id,
        },
      });
      return project;
    },
    async listProjects() {
      const projects = await db.project.findMany();
      return projects;
    },
    async updateProject(id, params) {
      const updatedProject = await db.project.update({
        where: {
          id,
        },
        data: {
          ...params,
        },
      });
      return updatedProject;
    },
    async deleteProject(id) {
      const result = await db.project.delete({
        where: { id },
      });
      return result;
    },
  };
}
