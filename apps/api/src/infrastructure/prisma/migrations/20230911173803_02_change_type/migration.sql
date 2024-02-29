/*
  Warnings:

  - You are about to drop the column `eventId` on the `profile_on_event` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `profile_on_event` table. All the data in the column will be lost.
  - You are about to drop the column `organizerId` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `required_particpants` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `status_id` on the `event` table. All the data in the column will be lost.
  - Added the required column `event_id` to the `profile_on_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `profile_on_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_name` to the `profile_on_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizer_id` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `required_participants` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_name` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_profile_on_event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profile_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "status_name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "profile_on_event_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_event_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_profile_on_event" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "profile_on_event";
DROP TABLE "profile_on_event";
ALTER TABLE "new_profile_on_event" RENAME TO "profile_on_event";
CREATE TABLE "new_image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "key" TEXT,
    "size" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_image" ("createdAt", "id", "key", "size", "updatedAt", "url") SELECT "createdAt", "id", "key", "size", "updatedAt", "url" FROM "image";
DROP TABLE "image";
ALTER TABLE "new_image" RENAME TO "image";
CREATE UNIQUE INDEX "image_url_key" ON "image"("url");
CREATE UNIQUE INDEX "image_key_key" ON "image"("key");
CREATE TABLE "new_profile_on_profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adder_id" INTEGER NOT NULL,
    "friend_id" INTEGER NOT NULL,
    "status_name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "profile_on_profile_adder_id_fkey" FOREIGN KEY ("adder_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_profile_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_profile_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_profile_on_profile" ("adder_id", "createdAt", "friend_id", "id", "updatedAt") SELECT "adder_id", "createdAt", "friend_id", "id", "updatedAt" FROM "profile_on_profile";
DROP TABLE "profile_on_profile";
ALTER TABLE "new_profile_on_profile" RENAME TO "profile_on_profile";
CREATE TABLE "new_profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "date_of_birth" DATETIME,
    "avatar_url" TEXT,
    "skill_foot_id" INTEGER,
    CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_avatar_url_fkey" FOREIGN KEY ("avatar_url") REFERENCES "image" ("url") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "profile_skill_foot_id_fkey" FOREIGN KEY ("skill_foot_id") REFERENCES "skill_foot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_profile" ("avatar_url", "date_of_birth", "id", "skill_foot_id", "user_id", "username") SELECT "avatar_url", "date_of_birth", "id", "skill_foot_id", "user_id", "username" FROM "profile";
DROP TABLE "profile";
ALTER TABLE "new_profile" RENAME TO "profile";
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");
CREATE TABLE "new_event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "required_participants" INTEGER NOT NULL,
    "num_teams" INTEGER NOT NULL DEFAULT 2,
    "organizer_id" INTEGER NOT NULL,
    "status_name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "event_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "event_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_event" ("createdAt", "date", "id", "location", "num_teams", "updatedAt") SELECT "createdAt", "date", "id", "location", "num_teams", "updatedAt" FROM "event";
DROP TABLE "event";
ALTER TABLE "new_event" RENAME TO "event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
