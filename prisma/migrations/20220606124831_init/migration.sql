/*
  Warnings:

  - The primary key for the `Link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UsersOnProjects` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Link" DROP CONSTRAINT "Link_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Link_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UsersOnProjects" DROP CONSTRAINT "UsersOnProjects_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UsersOnProjects_pkey" PRIMARY KEY ("id");
