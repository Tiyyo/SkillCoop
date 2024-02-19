/*
  Warnings:

  - You are about to drop the column `createdAt` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `num_teams` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `skill_foot` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `skill_foot` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `profile_on_profile` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `profile_on_profile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `sport` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `sport` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `status` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `status` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `profile_on_event` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `profile_on_event` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `skill_foot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `profile_on_profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `profile_on_event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "score" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "score_team_1" INTEGER NOT NULL,
    "score_team_2" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "score_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "required_participants" INTEGER NOT NULL,
    "nb_teams" INTEGER NOT NULL DEFAULT 2,
    "organizer_id" INTEGER NOT NULL,
    "status_name" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "event_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "event_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_event" ("date", "duration", "id", "location", "organizer_id", "required_participants", "status_name") SELECT "date", "duration", "id", "location", "organizer_id", "required_participants", "status_name" FROM "event";
DROP TABLE "event";
ALTER TABLE "new_event" RENAME TO "event";
CREATE TABLE "new_image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "key" TEXT,
    "size" INTEGER,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT
);
INSERT INTO "new_image" ("id", "key", "size", "url") SELECT "id", "key", "size", "url" FROM "image";
DROP TABLE "image";
ALTER TABLE "new_image" RENAME TO "image";
CREATE UNIQUE INDEX "image_url_key" ON "image"("url");
CREATE UNIQUE INDEX "image_key_key" ON "image"("key");
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verified" INTEGER NOT NULL DEFAULT 0,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT
);
INSERT INTO "new_user" ("email", "id", "password", "verified") SELECT "email", "id", "password", "verified" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE TABLE "new_skill_foot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pace" INTEGER NOT NULL,
    "shooting" INTEGER NOT NULL,
    "passing" INTEGER NOT NULL,
    "dribbling" INTEGER NOT NULL,
    "defending" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "sport_id" INTEGER NOT NULL,
    "rater_id" INTEGER NOT NULL,
    "reviewee_id" INTEGER NOT NULL,
    CONSTRAINT "skill_foot_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skill_foot_rater_id_fkey" FOREIGN KEY ("rater_id") REFERENCES "profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skill_foot_reviewee_id_fkey" FOREIGN KEY ("reviewee_id") REFERENCES "profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_skill_foot" ("defending", "dribbling", "id", "pace", "passing", "rater_id", "reviewee_id", "shooting", "sport_id") SELECT "defending", "dribbling", "id", "pace", "passing", "rater_id", "reviewee_id", "shooting", "sport_id" FROM "skill_foot";
DROP TABLE "skill_foot";
ALTER TABLE "new_skill_foot" RENAME TO "skill_foot";
CREATE TABLE "new_profile_on_profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adder_id" INTEGER NOT NULL,
    "friend_id" INTEGER NOT NULL,
    "status_name" TEXT,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "profile_on_profile_adder_id_fkey" FOREIGN KEY ("adder_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_profile_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_profile_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_profile_on_profile" ("adder_id", "friend_id", "id", "status_name") SELECT "adder_id", "friend_id", "id", "status_name" FROM "profile_on_profile";
DROP TABLE "profile_on_profile";
ALTER TABLE "new_profile_on_profile" RENAME TO "profile_on_profile";
CREATE TABLE "new_sport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_sport" ("id", "name") SELECT "id", "name" FROM "sport";
DROP TABLE "sport";
ALTER TABLE "new_sport" RENAME TO "sport";
CREATE UNIQUE INDEX "sport_name_key" ON "sport"("name");
CREATE TABLE "new_status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT
);
INSERT INTO "new_status" ("id", "name") SELECT "id", "name" FROM "status";
DROP TABLE "status";
ALTER TABLE "new_status" RENAME TO "status";
CREATE UNIQUE INDEX "status_name_key" ON "status"("name");
CREATE TABLE "new_profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "date_of_birth" DATETIME,
    "avatar_url" TEXT,
    "skill_foot_id" INTEGER,
    CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_avatar_url_fkey" FOREIGN KEY ("avatar_url") REFERENCES "image" ("url") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_skill_foot_id_fkey" FOREIGN KEY ("skill_foot_id") REFERENCES "skill_foot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_profile" ("avatar_url", "date_of_birth", "id", "skill_foot_id", "user_id", "username") SELECT "avatar_url", "date_of_birth", "id", "skill_foot_id", "user_id", "username" FROM "profile";
DROP TABLE "profile";
ALTER TABLE "new_profile" RENAME TO "profile";
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");
CREATE TABLE "new_profile_on_event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profile_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "status_name" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "profile_on_event_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_event_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_profile_on_event" ("event_id", "id", "profile_id", "status_name") SELECT "event_id", "id", "profile_id", "status_name" FROM "profile_on_event";
DROP TABLE "profile_on_event";
ALTER TABLE "new_profile_on_event" RENAME TO "profile_on_event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
