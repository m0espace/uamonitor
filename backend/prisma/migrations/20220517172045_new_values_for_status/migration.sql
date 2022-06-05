/*
  Warnings:

  - Added the required column `icon` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxOnline` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Status" ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "maxOnline" INTEGER NOT NULL,
ADD COLUMN     "version" TEXT NOT NULL;
