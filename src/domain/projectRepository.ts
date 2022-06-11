import type { Link, Project } from "@prisma/client";

export interface ProjectRepository {
  createProject(params: Project & { links: Link[] }): Promise<Project>;
  getProject(id: number): Promise<Project | null>;
  listProjects(): Promise<Project[]>;
  updateProject(id: number, params: Partial<Project>): Promise<Project>;
  deleteProject(id: number): Promise<Project>;
}
