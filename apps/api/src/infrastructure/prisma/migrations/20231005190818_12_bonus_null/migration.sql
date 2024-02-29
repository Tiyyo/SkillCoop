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
    "mvp_id" INTEGER,
    "best_striker_id" INTEGER,
    CONSTRAINT "event_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "event_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "event_mvp_id_fkey" FOREIGN KEY ("mvp_id") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "event_best_striker_id_fkey" FOREIGN KEY ("best_striker_id") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_event" ("best_striker_id", "created_at", "date", "duration", "id", "location", "mvp_id", "nb_teams", "organizer_id", "required_participants", "status_name", "updated_at") SELECT "best_striker_id", "created_at", "date", "duration", "id", "location", "mvp_id", "nb_teams", "organizer_id", "required_participants", "status_name", "updated_at" FROM "event";
DROP TABLE "event";
ALTER TABLE "new_event" RENAME TO "event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
