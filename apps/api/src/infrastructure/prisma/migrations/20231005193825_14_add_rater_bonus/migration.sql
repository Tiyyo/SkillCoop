/*
  Warnings:

  - The primary key for the `mvp_poll` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `mvp_poll` table. All the data in the column will be lost.
  - Added the required column `rater_id` to the `mvp_poll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rater_id` to the `best_striker_poll` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_mvp_poll" (
    "event_id" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "rater_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("event_id", "rater_id"),
    CONSTRAINT "mvp_poll_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "mvp_poll_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "mvp_poll_rater_id_fkey" FOREIGN KEY ("rater_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_mvp_poll" ("created_at", "event_id", "profile_id", "updated_at") SELECT "created_at", "event_id", "profile_id", "updated_at" FROM "mvp_poll";
DROP TABLE "mvp_poll";
ALTER TABLE "new_mvp_poll" RENAME TO "mvp_poll";
CREATE TABLE "new_best_striker_poll" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "event_id" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "rater_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "best_striker_poll_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "best_striker_poll_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "best_striker_poll_rater_id_fkey" FOREIGN KEY ("rater_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_best_striker_poll" ("created_at", "event_id", "id", "profile_id", "updated_at") SELECT "created_at", "event_id", "id", "profile_id", "updated_at" FROM "best_striker_poll";
DROP TABLE "best_striker_poll";
ALTER TABLE "new_best_striker_poll" RENAME TO "best_striker_poll";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
