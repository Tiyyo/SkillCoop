/*
  Warnings:

  - The primary key for the `language_preference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `language_preference` table. All the data in the column will be lost.
  - The primary key for the `theme_preference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `theme_preference` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_language_preference" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'en',
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "language_preference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_language_preference" ("created_at", "name", "updated_at", "user_id") SELECT "created_at", "name", "updated_at", "user_id" FROM "language_preference";
DROP TABLE "language_preference";
ALTER TABLE "new_language_preference" RENAME TO "language_preference";
CREATE TABLE "new_theme_preference" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'light',
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "theme_preference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_theme_preference" ("created_at", "name", "updated_at", "user_id") SELECT "created_at", "name", "updated_at", "user_id" FROM "theme_preference";
DROP TABLE "theme_preference";
ALTER TABLE "new_theme_preference" RENAME TO "theme_preference";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
