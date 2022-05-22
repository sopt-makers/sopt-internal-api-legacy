import type { IProject } from "./entities/project";

export interface ProjectRepository {
  createProject(params: IProject): Promise<IProject | undefined>;
  listProjects(): Promise<IProject[] | undefined>;
  updateProject(id: number, params: Partial<IProject>): Promise<IProject | undefined>;
  deleteProject(id: number): Promise<{ id: number | undefined } | undefined>;
}
