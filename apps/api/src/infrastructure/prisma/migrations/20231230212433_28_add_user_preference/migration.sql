/*
  Warnings:

  - You are about to drop the column `type` on the `notification` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "notification_type" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT
);

-- CreateTable
CREATE TABLE "notification_preference" (
    "user_id" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "theme_preference" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'light',
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "theme_preference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "language_preference" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'en',
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "language_preference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profile_id" INTEGER NOT NULL,
    "instigator_id" INTEGER,
    "event_id" INTEGER,
    "img_url" TEXT,
    "type_name" TEXT,
    "subtype" TEXT,
    "message" TEXT NOT NULL,
    "is_read" INTEGER NOT NULL DEFAULT 0,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "notification_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "notification_instigator_id_fkey" FOREIGN KEY ("instigator_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "notification_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "notification_type_name_fkey" FOREIGN KEY ("type_name") REFERENCES "notification_type" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_notification" ("created_at", "event_id", "id", "img_url", "instigator_id", "is_read", "message", "profile_id", "subtype", "updated_at") SELECT "created_at", "event_id", "id", "img_url", "instigator_id", "is_read", "message", "profile_id", "subtype", "updated_at" FROM "notification";
DROP TABLE "notification";
ALTER TABLE "new_notification" RENAME TO "notification";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "notification_type_name_key" ON "notification_type"("name");
