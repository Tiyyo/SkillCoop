/*
  Warnings:

  - The primary key for the `profile_on_event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `profile_on_event` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_profile_on_event" (
    "profile_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "team" INTEGER,
    "status_name" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("profile_id", "event_id"),
    CONSTRAINT "profile_on_event_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_event_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_profile_on_event" ("created_at", "event_id", "profile_id", "status_name", "team", "updated_at") SELECT "created_at", "event_id", "profile_id", "status_name", "team", "updated_at" FROM "profile_on_event";
DROP TABLE "profile_on_event";
ALTER TABLE "new_profile_on_event" RENAME TO "profile_on_event";
CREATE TABLE "new_profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "username" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "location" TEXT,
    "date_of_birth" TEXT,
    "avatar_url" TEXT,
    "last_evaluation" INTEGER,
    CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_avatar_url_fkey" FOREIGN KEY ("avatar_url") REFERENCES "image" ("url") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_profile" ("avatar_url", "date_of_birth", "first_name", "id", "last_name", "location", "user_id", "username") SELECT "avatar_url", "date_of_birth", "first_name", "id", "last_name", "location", "user_id", "username" FROM "profile";
DROP TABLE "profile";
ALTER TABLE "new_profile" RENAME TO "profile";
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");
CREATE TABLE "new_event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "required_participants" INTEGER NOT NULL,
    "nb_teams" INTEGER NOT NULL DEFAULT 2,
    "organizer_id" INTEGER,
    "status_name" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "mvp_id" INTEGER,
    "best_striker_id" INTEGER,
    CONSTRAINT "event_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "profile" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "event_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "event_mvp_id_fkey" FOREIGN KEY ("mvp_id") REFERENCES "profile" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "event_best_striker_id_fkey" FOREIGN KEY ("best_striker_id") REFERENCES "profile" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_event" ("best_striker_id", "created_at", "date", "duration", "id", "location", "mvp_id", "nb_teams", "organizer_id", "required_participants", "status_name", "updated_at") SELECT "best_striker_id", "created_at", "date", "duration", "id", "location", "mvp_id", "nb_teams", "organizer_id", "required_participants", "status_name", "updated_at" FROM "event";
DROP TABLE "event";
ALTER TABLE "new_event" RENAME TO "event";
CREATE TABLE "new_skill_foot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pace" INTEGER NOT NULL,
    "shooting" INTEGER NOT NULL,
    "passing" INTEGER NOT NULL,
    "dribbling" INTEGER NOT NULL,
    "defending" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "rater_id" INTEGER NOT NULL,
    "reviewee_id" INTEGER NOT NULL,
    "event_id" INTEGER,
    CONSTRAINT "skill_foot_rater_id_fkey" FOREIGN KEY ("rater_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "skill_foot_reviewee_id_fkey" FOREIGN KEY ("reviewee_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "skill_foot_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_skill_foot" ("created_at", "defending", "dribbling", "event_id", "id", "pace", "passing", "rater_id", "reviewee_id", "shooting", "updated_at") SELECT "created_at", "defending", "dribbling", "event_id", "id", "pace", "passing", "rater_id", "reviewee_id", "shooting", "updated_at" FROM "skill_foot";
DROP TABLE "skill_foot";
ALTER TABLE "new_skill_foot" RENAME TO "skill_foot";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
