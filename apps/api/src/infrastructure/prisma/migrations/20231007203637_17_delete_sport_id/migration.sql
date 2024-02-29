/*
  Warnings:

  - You are about to drop the column `sport_id` on the `skill_foot` table. All the data in the column will be lost.

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
    "rater_id" INTEGER NOT NULL,
    "reviewee_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("event_id", "rater_id"),
    CONSTRAINT "skill_foot_rater_id_fkey" FOREIGN KEY ("rater_id") REFERENCES "profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skill_foot_reviewee_id_fkey" FOREIGN KEY ("reviewee_id") REFERENCES "profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skill_foot_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_skill_foot" ("created_at", "defending", "dribbling", "event_id", "pace", "passing", "rater_id", "reviewee_id", "shooting", "updated_at") SELECT "created_at", "defending", "dribbling", "event_id", "pace", "passing", "rater_id", "reviewee_id", "shooting", "updated_at" FROM "skill_foot";
DROP TABLE "skill_foot";
ALTER TABLE "new_skill_foot" RENAME TO "skill_foot";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
