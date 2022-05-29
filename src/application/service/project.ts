import type { Repository } from "@/domain";
import { ILink } from "@/domain/entities/link";
import type { IProject } from "@/domain/entities/project";

export interface ProjectService {
  createProject: (
    params: IProject & { links: Array<Omit<ILink, "id">> },
  ) => Promise<(IProject & { links: ILink[] }) | undefined>;
  getProject: (id: number) => Promise<(IProject & { links: ILink[] }) | undefined>;
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
    async createProject(params) {
      // TODO: transaction 관리하기 쉬운 구조로 바꾸기...
      const { links, ...projectParams } = params;
      const project = await repository.project.createProject(projectParams, (trx, projectId) =>
        repository.link.createLinks(trx, projectId, links),
      );
      return project;
    },
    async getProject(id) {
      const project = await repository.project.getProject(id);
      const links = await repository.link.getLinksByProjectId(project?.id as number);
      const result = { ...project, links };
      return result as IProject & { links: ILink[] };
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
