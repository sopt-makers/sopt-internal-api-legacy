import { Transaction } from "kysely";

import { DatabaseSchema } from "@/infrastructure/database";

import { ILink } from "./entities/link";
import type { IProject } from "./entities/project";
import { LinkRepository } from "./linkRepository";

export interface ProjectRepository {
  createProject(
    params: IProject,
    createLinksCallback: (
      trx: Transaction<DatabaseSchema>,
      projectId: number,
    ) => ReturnType<LinkRepository["createLinks"]>,
  ): Promise<(IProject & { links: ILink[] }) | undefined>;
  getProject(id: number): Promise<IProject | undefined>;
  listProjects(): Promise<IProject[] | undefined>;
  updateProject(id: number, params: Partial<IProject>): Promise<IProject | undefined>;
  deleteProject(id: number): Promise<{ id: number | undefined } | undefined>;
}
