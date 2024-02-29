/*
  Warnings:

  - The primary key for the `mvp_poll` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `language_preference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `profile_on_profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `theme_preference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `notification_preference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `profile_on_event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `best_striker_poll` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_mvp_poll" (
    "event_id" INTEGER NOT NULL,
    "profile_id" TEXT NOT NULL,
    "rater_id" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("event_id", "rater_id"),
    CONSTRAINT "mvp_poll_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "mvp_poll_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("profile_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "mvp_poll_rater_id_fkey" FOREIGN KEY ("rater_id") REFERENCES "profile" ("profile_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_mvp_poll" ("created_at", "event_id", "profile_id", "rater_id", "updated_at") SELECT "created_at", "event_id", "profile_id", "rater_id", "updated_at" FROM "mvp_poll";
DROP TABLE "mvp_poll";
ALTER TABLE "new_mvp_poll" RENAME TO "mvp_poll";
CREATE TABLE "new_skill_foot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pace" INTEGER NOT NULL,
    "shooting" INTEGER NOT NULL,
    "passing" INTEGER NOT NULL,
    "dribbling" INTEGER NOT NULL,
    "defending" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "rater_id" TEXT NOT NULL,
    "reviewee_id" TEXT NOT NULL,
    "event_id" INTEGER,
    CONSTRAINT "skill_foot_rater_id_fkey" FOREIGN KEY ("rater_id") REFERENCES "profile" ("profile_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "skill_foot_reviewee_id_fkey" FOREIGN KEY ("reviewee_id") REFERENCES "profile" ("profile_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "skill_foot_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_skill_foot" ("created_at", "defending", "dribbling", "event_id", "id", "pace", "passing", "rater_id", "reviewee_id", "shooting", "updated_at") SELECT "created_at", "defending", "dribbling", "event_id", "id", "pace", "passing", "rater_id", "reviewee_id", "shooting", "updated_at" FROM "skill_foot";
DROP TABLE "skill_foot";
ALTER TABLE "new_skill_foot" RENAME TO "skill_foot";
CREATE TABLE "new_language_preference" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'en',
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "language_preference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_language_preference" ("created_at", "name", "updated_at", "user_id") SELECT "created_at", "name", "updated_at", "user_id" FROM "language_preference";
DROP TABLE "language_preference";
ALTER TABLE "new_language_preference" RENAME TO "language_preference";
CREATE TABLE "new_profile_on_profile" (
    "adder_id" TEXT NOT NULL,
    "friend_id" TEXT NOT NULL,
    "status_name" TEXT,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("adder_id", "friend_id"),
    CONSTRAINT "profile_on_profile_adder_id_fkey" FOREIGN KEY ("adder_id") REFERENCES "profile" ("profile_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_profile_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "profile" ("profile_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_profile_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_profile_on_profile" ("adder_id", "created_at", "friend_id", "status_name", "updated_at") SELECT "adder_id", "created_at", "friend_id", "status_name", "updated_at" FROM "profile_on_profile";
DROP TABLE "profile_on_profile";
ALTER TABLE "new_profile_on_profile" RENAME TO "profile_on_profile";
CREATE TABLE "new_profile" (
    "profile_id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "location" TEXT,
    "date_of_birth" TEXT,
    "avatar_url" TEXT,
    "last_evaluation" INTEGER,
    "active_notification" INTEGER NOT NULL DEFAULT 1,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "profile_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_avatar_url_fkey" FOREIGN KEY ("avatar_url") REFERENCES "image" ("url") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_profile" ("active_notification", "avatar_url", "created_at", "date_of_birth", "first_name", "last_evaluation", "last_name", "location", "profile_id", "updated_at", "username") SELECT "active_notification", "avatar_url", "created_at", "date_of_birth", "first_name", "last_evaluation", "last_name", "location", "profile_id", "updated_at", "username" FROM "profile";
DROP TABLE "profile";
ALTER TABLE "new_profile" RENAME TO "profile";
CREATE UNIQUE INDEX "profile_profile_id_key" ON "profile"("profile_id");
CREATE TABLE "new_theme_preference" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'light',
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "theme_preference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_theme_preference" ("created_at", "name", "updated_at", "user_id") SELECT "created_at", "name", "updated_at", "user_id" FROM "theme_preference";
DROP TABLE "theme_preference";
ALTER TABLE "new_theme_preference" RENAME TO "theme_preference";
CREATE TABLE "new_notification_preference" (
    "user_id" TEXT NOT NULL,
    "type_name" TEXT NOT NULL,
    "email" INTEGER NOT NULL DEFAULT 1,
    "push" INTEGER NOT NULL DEFAULT 1,
    "website" INTEGER NOT NULL DEFAULT 1,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("user_id", "type_name"),
    CONSTRAINT "notification_preference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "notification_preference_type_name_fkey" FOREIGN KEY ("type_name") REFERENCES "notification_type" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_notification_preference" ("created_at", "email", "push", "type_name", "updated_at", "user_id", "website") SELECT "created_at", "email", "push", "type_name", "updated_at", "user_id", "website" FROM "notification_preference";
DROP TABLE "notification_preference";
ALTER TABLE "new_notification_preference" RENAME TO "notification_preference";
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verified" INTEGER NOT NULL DEFAULT 0,
    "blocked" INTEGER NOT NULL DEFAULT 0,
    "failed_attempts" INTEGER NOT NULL DEFAULT 0,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT
);
INSERT INTO "new_user" ("blocked", "created_at", "email", "failed_attempts", "id", "password", "updated_at", "verified") SELECT "blocked", "created_at", "email", "failed_attempts", "id", "password", "updated_at", "verified" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE TABLE "new_profile_on_event" (
    "profile_id" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,
    "team" INTEGER,
    "status_name" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("profile_id", "event_id"),
    CONSTRAINT "profile_on_event_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("profile_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_event_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_profile_on_event" ("created_at", "event_id", "profile_id", "status_name", "team", "updated_at") SELECT "created_at", "event_id", "profile_id", "status_name", "team", "updated_at" FROM "profile_on_event";
DROP TABLE "profile_on_event";
ALTER TABLE "new_profile_on_event" RENAME TO "profile_on_event";
CREATE TABLE "new_best_striker_poll" (
    "event_id" INTEGER NOT NULL,
    "profile_id" TEXT NOT NULL,
    "rater_id" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("event_id", "rater_id"),
    CONSTRAINT "best_striker_poll_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "best_striker_poll_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("profile_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "best_striker_poll_rater_id_fkey" FOREIGN KEY ("rater_id") REFERENCES "profile" ("profile_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_best_striker_poll" ("created_at", "event_id", "profile_id", "rater_id", "updated_at") SELECT "created_at", "event_id", "profile_id", "rater_id", "updated_at" FROM "best_striker_poll";
DROP TABLE "best_striker_poll";
ALTER TABLE "new_best_striker_poll" RENAME TO "best_striker_poll";
CREATE TABLE "new_event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "domain_id" TEXT,
    "date" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "required_participants" INTEGER NOT NULL,
    "price" REAL,
    "nb_teams" INTEGER NOT NULL DEFAULT 2,
    "visibility" TEXT NOT NULL DEFAULT 'private',
    "location_id" INTEGER NOT NULL,
    "organizer_id" TEXT,
    "status_name" TEXT NOT NULL,
    "mvp_id" TEXT,
    "best_striker_id" TEXT,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "event_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "playground" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "event_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "profile" ("profile_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "event_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "event_mvp_id_fkey" FOREIGN KEY ("mvp_id") REFERENCES "profile" ("profile_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "event_best_striker_id_fkey" FOREIGN KEY ("best_striker_id") REFERENCES "profile" ("profile_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_event" ("best_striker_id", "created_at", "date", "duration", "id", "location_id", "mvp_id", "nb_teams", "organizer_id", "price", "required_participants", "status_name", "updated_at", "visibility") SELECT "best_striker_id", "created_at", "date", "duration", "id", "location_id", "mvp_id", "nb_teams", "organizer_id", "price", "required_participants", "status_name", "updated_at", "visibility" FROM "event";
DROP TABLE "event";
ALTER TABLE "new_event" RENAME TO "event";
CREATE UNIQUE INDEX "event_domain_id_key" ON "event"("domain_id");
CREATE TABLE "new_notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profile_id" TEXT NOT NULL,
    "instigator_id" TEXT,
    "event_id" INTEGER,
    "img_url" TEXT,
    "type_name" TEXT,
    "subtype" TEXT,
    "message" TEXT NOT NULL,
    "is_read" INTEGER NOT NULL DEFAULT 0,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "notification_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("profile_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "notification_instigator_id_fkey" FOREIGN KEY ("instigator_id") REFERENCES "profile" ("profile_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "notification_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "notification_type_name_fkey" FOREIGN KEY ("type_name") REFERENCES "notification_type" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_notification" ("created_at", "event_id", "id", "img_url", "instigator_id", "is_read", "message", "profile_id", "subtype", "type_name", "updated_at") SELECT "created_at", "event_id", "id", "img_url", "instigator_id", "is_read", "message", "profile_id", "subtype", "type_name", "updated_at" FROM "notification";
DROP TABLE "notification";
ALTER TABLE "new_notification" RENAME TO "notification";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
