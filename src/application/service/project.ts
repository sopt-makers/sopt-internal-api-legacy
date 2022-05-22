import type { Repository } from "@/domain";
import type { IProject } from "@/domain/entities/project";

export interface ProjectService {
  createProject: (params: IProject) => Promise<IProject | undefined>;
  listProjects: () => Promise<IProject[] | undefined>;
  updateProject: (id: number, params: Partial<IProject>) => Promise<IProject | undefined>;
  deleteProject: (id: number) => Promise<{ id: number | undefined } | undefined>;
}

interface CreateServicesDeps {
  repository: Repository;
}

export function createProjectService({ repository }: CreateServicesDeps): ProjectService {
  repository;

  return {
    async createProject(params: IProject) {
      const project = await repository.project.createProject(params);
      return project;
    },
    async listProjects() {
      const projects = await repository.project.listProjects();
      return projects;
    },
    async updateProject(id: number, params: Partial<IProject>) {
      const project = await repository.project.updateProject(id, params);
      return project;
    },
    async deleteProject(id: number) {
      const project = await repository.project.deleteProject(id);
      return project;
    },
  };
}
