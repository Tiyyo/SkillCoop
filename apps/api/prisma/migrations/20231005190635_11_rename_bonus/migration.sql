/*
  Warnings:

  - You are about to drop the `best_striker_pool` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mvp_pool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "best_striker_pool";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "mvp_pool";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "mvp_poll" (
    "event_id" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("event_id", "profile_id"),
    CONSTRAINT "mvp_poll_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "mvp_poll_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "best_striker_poll" (
    "event_id" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("event_id", "profile_id"),
    CONSTRAINT "best_striker_poll_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "best_striker_poll_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
