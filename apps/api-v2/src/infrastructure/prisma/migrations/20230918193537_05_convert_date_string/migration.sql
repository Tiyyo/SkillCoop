-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "date_of_birth" TEXT,
    "avatar_url" TEXT,
    "skill_foot_id" INTEGER,
    CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_avatar_url_fkey" FOREIGN KEY ("avatar_url") REFERENCES "image" ("url") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_skill_foot_id_fkey" FOREIGN KEY ("skill_foot_id") REFERENCES "skill_foot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_profile" ("avatar_url", "date_of_birth", "id", "skill_foot_id", "user_id", "username") SELECT "avatar_url", "date_of_birth", "id", "skill_foot_id", "user_id", "username" FROM "profile";
DROP TABLE "profile";
ALTER TABLE "new_profile" RENAME TO "profile";
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");
CREATE TABLE "new_sport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT
);
INSERT INTO "new_sport" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "sport";
DROP TABLE "sport";
ALTER TABLE "new_sport" RENAME TO "sport";
CREATE UNIQUE INDEX "sport_name_key" ON "sport"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
