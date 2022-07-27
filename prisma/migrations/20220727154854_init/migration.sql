/*
  Warnings:

  - Added the required column `logo_image` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "logo_image" TEXT NOT NULL;
