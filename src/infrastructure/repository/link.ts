import { LinkRepository } from "@/domain/linkRepository";
import { Database } from "@/infrastructure/database";

export function createLinkRepository(_db: Database): LinkRepository {
  return {
    async createLinks(trx, projectId, links) {
      const result = await trx
        .insertInto("links")
        .values(
          links.map((link) => {
            link.project_id = projectId;
            return link;
          }),
        )
        .returningAll()
        .execute();
      return result;
    },
    async getLinksByProjectId(projectId) {
      const links = await _db.selectFrom("links").where("project_id", "=", projectId).selectAll().execute();
      return links;
    },
  };
}
