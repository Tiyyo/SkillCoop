/*
  Warnings:

  - The primary key for the `profile_on_profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `profile_on_profile` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_profile_on_profile" (
    "adder_id" INTEGER NOT NULL,
    "friend_id" INTEGER NOT NULL,
    "status_name" TEXT,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("adder_id", "friend_id"),
    CONSTRAINT "profile_on_profile_adder_id_fkey" FOREIGN KEY ("adder_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_profile_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_profile_status_name_fkey" FOREIGN KEY ("status_name") REFERENCES "status" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_profile_on_profile" ("adder_id", "created_at", "friend_id", "status_name", "updated_at") SELECT "adder_id", "created_at", "friend_id", "status_name", "updated_at" FROM "profile_on_profile";
DROP TABLE "profile_on_profile";
ALTER TABLE "new_profile_on_profile" RENAME TO "profile_on_profile";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
