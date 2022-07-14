import type { Link, Project, UsersOnProjects } from "@prisma/client";

import { CreateProjectModelType, UpdateProjectModelType } from "@/domain/validators/project";

export interface ProjectRepository {
  createProject(params: CreateProjectModelType): Promise<Project & { links: Link[]; users: UsersOnProjects[] }>;
  getProject(id: number): Promise<(Project & { links: Link[]; users: UsersOnProjects[] }) | null>;
  listProjects(): Promise<Array<Partial<Project>>>;
  updateProject(
    id: number,
    params: UpdateProjectModelType,
  ): Promise<Project & { links: Link[]; users: UsersOnProjects[] }>;
  deleteProject(id: number): Promise<Project>;
}
