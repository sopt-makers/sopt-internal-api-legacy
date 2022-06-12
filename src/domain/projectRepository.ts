import type { Project } from "@prisma/client";

import { CreateProjectModelType } from "@/domain/validators/project";

export interface ProjectRepository {
  createProject(params: CreateProjectModelType): Promise<Project>;
  getProject(id: number): Promise<Project | null>;
  listProjects(): Promise<Project[]>;
  updateProject(id: number, params: Partial<Project>): Promise<Project>;
  deleteProject(id: number): Promise<Project>;
}
