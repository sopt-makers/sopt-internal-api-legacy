import type { Project } from "@prisma/client";

import type { Repository } from "@/domain";
import { CreateProjectModelType } from "@/domain/validators/project";

export interface ProjectService {
  createProject: (params: CreateProjectModelType) => Promise<Project>;
  getProject: (id: number) => Promise<Project | null>;
  listProjects: () => Promise<Project[]>;
  updateProject: (id: number, params: Partial<Project>) => Promise<Project>;
  deleteProject: (id: number) => Promise<Project>;
}

interface CreateServicesDeps {
  repository: Repository;
}

export function createProjectService({ repository }: CreateServicesDeps): ProjectService {
  repository;

  return {
    async createProject(params) {
      const project = await repository.project.createProject(params);
      return project;
    },
    async getProject(id) {
      const project = await repository.project.getProject(id);
      return project;
    },
    async listProjects() {
      const projects = await repository.project.listProjects();
      return projects;
    },
    async updateProject(id: number, params: Partial<Project>) {
      const project = await repository.project.updateProject(id, params);
      return project;
    },
    async deleteProject(id: number) {
      const project = await repository.project.deleteProject(id);
      return project;
    },
  };
}
