import { Prisma } from "@prisma/client";

import type { ProjectRepository } from "@/domain/projectRepository";
import { PrismaDatabase } from "@/infrastructure/database";
import { AppError } from "@/util/error/AppError";
import { HttpCode } from "@/util/HttpCode";

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
          users: true,
        },
      });
      if (!project) {
        throw new AppError("Not Found", HttpCode.NOT_FOUND, "존재하지 않는 프로젝트입니다.");
      }
      return project;
    },
    async listProjects() {
      const projects = await db.project.findMany({
        include: {
          links: true,
          users: true,
        },
      });
      return projects;
    },
    async updateProject(id, params) {
      const updateLinksQuery: Prisma.ProjectUpdateArgs["data"] = {
        links: {
          deleteMany: {},
          create: params.links,
        },
      };

      const updateUsersQuery: Prisma.ProjectUpdateArgs["data"] = {
        users: {
          deleteMany: {},
          create: params.users?.map((user) => ({
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
      };

      const updatedProject = await db.project.update({
        where: {
          id,
        },
        data: {
          ...params,
          ...(params.links && params.links.length > 0 && updateLinksQuery),
          ...(params.users && params.users.length > 0 && updateUsersQuery),
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
