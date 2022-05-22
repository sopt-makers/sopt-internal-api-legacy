import type { Repository } from "@/domain";
import { projectsSchema } from "@/domain/__generated__/entities";
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

export function createUserService({ repository }: CreateServicesDeps): ProjectService {
  repository;

  return {
    async createProject(params: IProject) {
      const validProjectParams = projectsSchema.parse(params);
      const project = await repository.project.createProject(validProjectParams);
      return project;
    },
    async listProjects() {
      const projects = await repository.project.listProjects();
      return projects;
    },
    async updateProject(id: number, params: Partial<IProject>) {
      const validProjectParams = projectsSchema.partial().parse(params);
      const project = await repository.project.updateProject(id, validProjectParams);
      return project;
    },
    async deleteProject(id: number) {
      const project = await repository.project.deleteProject(id);
      return project;
    },
  };
}
