/*
  Warnings:

  - You are about to drop the `best_striker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mvp` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `best_striker_id` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mvp_id` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "best_striker";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "mvp";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "mvp_pool" (
    "event_id" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("event_id", "profile_id"),
    CONSTRAINT "mvp_pool_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "mvp_pool_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "best_striker_pool" (
    "event_id" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("event_id", "profile_id"),
    CONSTRAINT "best_striker_pool_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "best_striker_pool_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    "mvp_id" INTEGER NOT NULL,
    "best_striker_id" INTEGER NOT NULL,
    CONSTRAINT "event_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "event_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "event_mvp_id_fkey" FOREIGN KEY ("mvp_id") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "event_best_striker_id_fkey" FOREIGN KEY ("best_striker_id") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_event" ("created_at", "date", "duration", "id", "location", "nb_teams", "organizer_id", "required_participants", "status_name", "updated_at") SELECT "created_at", "date", "duration", "id", "location", "nb_teams", "organizer_id", "required_participants", "status_name", "updated_at" FROM "event";
DROP TABLE "event";
ALTER TABLE "new_event" RENAME TO "event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
