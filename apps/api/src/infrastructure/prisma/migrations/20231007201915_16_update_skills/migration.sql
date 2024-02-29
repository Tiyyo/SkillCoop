/*
  Warnings:

  - The primary key for the `skill_foot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `skill_foot` table. All the data in the column will be lost.
  - You are about to drop the column `skill_foot_id` on the `profile` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_skill_foot" (
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
    "event_id" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("event_id", "rater_id"),
    CONSTRAINT "skill_foot_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skill_foot_rater_id_fkey" FOREIGN KEY ("rater_id") REFERENCES "profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skill_foot_reviewee_id_fkey" FOREIGN KEY ("reviewee_id") REFERENCES "profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skill_foot_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_skill_foot" ("created_at", "defending", "dribbling", "pace", "passing", "rater_id", "reviewee_id", "shooting", "sport_id", "updated_at") SELECT "created_at", "defending", "dribbling", "pace", "passing", "rater_id", "reviewee_id", "shooting", "sport_id", "updated_at" FROM "skill_foot";
DROP TABLE "skill_foot";
ALTER TABLE "new_skill_foot" RENAME TO "skill_foot";
CREATE TABLE "new_profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "location" TEXT,
    "date_of_birth" TEXT,
    "avatar_url" TEXT,
    CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_avatar_url_fkey" FOREIGN KEY ("avatar_url") REFERENCES "image" ("url") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_profile" ("avatar_url", "date_of_birth", "first_name", "id", "last_name", "location", "user_id", "username") SELECT "avatar_url", "date_of_birth", "first_name", "id", "last_name", "location", "user_id", "username" FROM "profile";
DROP TABLE "profile";
ALTER TABLE "new_profile" RENAME TO "profile";
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");
CREATE UNIQUE INDEX "profile_username_key" ON "profile"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
