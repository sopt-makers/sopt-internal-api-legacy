import type { ProjectRepository } from "@/domain/projectRepository";
import { PrismaDatabase } from "@/infrastructure/database";

export function createProjectRepository(db: PrismaDatabase): ProjectRepository {
  return {
    async createProject(params) {
      const project = await db.project.create({
        data: {
          ...params,
          links: {
            create: params.links,
          },
          users: {
            create: params.users.map((user) => ({
              description: user.description,
              role: user.role,
              is_team_member: user.is_team_member,
              user: {
                connect: {
                  id: user.user_id,
                },
              },
            })),
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
