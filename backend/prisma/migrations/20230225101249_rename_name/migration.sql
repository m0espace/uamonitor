/*
  Warnings:

  - You are about to drop the column `discordName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "discordName",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Anon';
