import { Transaction } from "kysely";

import { DatabaseSchema } from "@/infrastructure/database";

import type { ILink } from "./entities/link";

export interface LinkRepository {
  createLinks(
    trx: Transaction<DatabaseSchema>,
    projectId: number,
    links: Array<Omit<ILink, "id">>,
  ): Promise<ILink[] | undefined>;
  getLinksByProjectId(projectId: number): Promise<ILink[] | undefined>;
}
