-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "username" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "location" TEXT,
    "date_of_birth" TEXT,
    "avatar_url" TEXT,
    "last_evaluation" INTEGER,
    "active_notification" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_avatar_url_fkey" FOREIGN KEY ("avatar_url") REFERENCES "image" ("url") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_profile" ("active_notification", "avatar_url", "date_of_birth", "first_name", "id", "last_evaluation", "last_name", "location", "user_id", "username") SELECT "active_notification", "avatar_url", "date_of_birth", "first_name", "id", "last_evaluation", "last_name", "location", "user_id", "username" FROM "profile";
DROP TABLE "profile";
ALTER TABLE "new_profile" RENAME TO "profile";
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
