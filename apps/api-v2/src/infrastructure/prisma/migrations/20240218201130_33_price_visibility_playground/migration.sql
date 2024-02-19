/*
  Warnings:

  - You are about to drop the column `location` on the `event` table. All the data in the column will be lost.
  - Added the required column `location_id` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "playground" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "post_code" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "required_participants" INTEGER NOT NULL,
    "price" REAL,
    "nb_teams" INTEGER NOT NULL DEFAULT 2,
    "visibility" TEXT NOT NULL DEFAULT 'private',
    "location_id" INTEGER NOT NULL,
    "organizer_id" INTEGER,
    "status_name" TEXT NOT NULL,
    "mvp_id" INTEGER,
    "best_striker_id" INTEGER,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "event_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "playground" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "event_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "profile" ("profile_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "event_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "event_mvp_id_fkey" FOREIGN KEY ("mvp_id") REFERENCES "profile" ("profile_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "event_best_striker_id_fkey" FOREIGN KEY ("best_striker_id") REFERENCES "profile" ("profile_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_event" ("best_striker_id", "created_at", "date", "duration", "id", "mvp_id", "nb_teams", "organizer_id", "required_participants", "status_name", "updated_at") SELECT "best_striker_id", "created_at", "date", "duration", "id", "mvp_id", "nb_teams", "organizer_id", "required_participants", "status_name", "updated_at" FROM "event";
DROP TABLE "event";
ALTER TABLE "new_event" RENAME TO "event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "playground_name_address_city_key" ON "playground"("name", "address", "city");
