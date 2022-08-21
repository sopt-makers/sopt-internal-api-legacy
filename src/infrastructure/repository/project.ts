import type { ProjectRepository } from "@/domain/projectRepository";
import { PrismaDatabase } from "@/infrastructure/database";
import { AppError } from "@/util/error/AppError";
import { HttpCode } from "@/util/HttpCode";

export function createProjectRepository(db: PrismaDatabase): ProjectRepository {
  return {
    async createProject(params, userId) {
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
          creator_id: userId,
        },
        include: {
          links: true,
          users: true,
        },
      });

      return project;
    },
    async getProject(id) {
      const project = await db.project.findUnique({
        where: {
          id,
        },
        include: {
          links: true,
          users: {
            include: {
              user: true,
            },
          },
        },
      });
      if (!project) {
        throw new AppError("Not Found", HttpCode.NOT_FOUND, "존재하지 않는 프로젝트입니다.");
      }
      return project;
    },
    async listProjects() {
      const projects = await db.project.findMany({
        select: {
          id: true,
          name: true,
          generation: true,
          category: true,
          service_type: true,
          summary: true,
          thumbnail_image: true,
          links: true,
        },
      });
      return projects;
    },
    async updateProject(id, params) {
      const updatedProject = await db.project.update({
        where: {
          id,
        },
        data: {
          ...params,
          links: {
            deleteMany: {},
            create: params.links && params.links.length > 0 ? params.links : undefined,
          },
          users: {
            deleteMany: {},
            create:
              params.users && params.users.length > 0
                ? params.users?.map((user) => ({
                    description: user.description,
                    role: user.role,
                    is_team_member: user.is_team_member,
                    user: {
                      connect: {
                        id: user.user_id,
                      },
                    },
                  }))
                : undefined,
          },
        },
        include: {
          links: true,
          users: true,
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
