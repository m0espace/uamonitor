/*
  Warnings:

  - You are about to drop the column `icon` on the `Status` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "icon" TEXT;

-- AlterTable
ALTER TABLE "Status" DROP COLUMN "icon";
