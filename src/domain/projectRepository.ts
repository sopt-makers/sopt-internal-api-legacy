import { Projects } from "@/domain/__generated__/psql";

export interface ProjectRepository {
  createProject(params: Projects): Promise<Projects | undefined>;
  listProjects(): Promise<Projects[]>;
  updateProject(id: number, params: Partial<Projects>): Promise<Projects | undefined>;
  deleteProject(id: number): Promise<unknown>;
}
