-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_project_id_fkey";

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
