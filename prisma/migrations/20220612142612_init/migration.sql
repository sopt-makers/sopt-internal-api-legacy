/*
  Warnings:

  - The primary key for the `UsersOnProjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UsersOnProjects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UsersOnProjects" DROP CONSTRAINT "UsersOnProjects_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UsersOnProjects_pkey" PRIMARY KEY ("project_id", "user_id");
