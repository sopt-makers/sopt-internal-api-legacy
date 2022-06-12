import type { Prisma, Project } from "@prisma/client";

export interface ProjectRepository {
  createProject(params: Prisma.ProjectCreateArgs["data"]): Promise<Project>;
  getProject(id: number): Promise<Project | null>;
  listProjects(): Promise<Project[]>;
  updateProject(id: number, params: Partial<Project>): Promise<Project>;
  deleteProject(id: number): Promise<Project>;
}
