/*
  Warnings:

  - A unique constraint covering the columns `[telegramCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_telegramCode_key" ON "User"("telegramCode");
