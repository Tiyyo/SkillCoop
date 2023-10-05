/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "profile" ADD COLUMN "first_name" TEXT;
ALTER TABLE "profile" ADD COLUMN "last_name" TEXT;
ALTER TABLE "profile" ADD COLUMN "location" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "profile_username_key" ON "profile"("username");
