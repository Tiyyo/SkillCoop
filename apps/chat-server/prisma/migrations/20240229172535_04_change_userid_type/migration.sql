/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT
);
INSERT INTO "new_user" ("avatar", "created_at", "updated_at", "user_id", "username") SELECT "avatar", "created_at", "updated_at", "user_id", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE TABLE "new_message" (
    "message_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT,
    "conversation_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation" ("conversation_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_message" ("conversation_id", "created_at", "message", "message_id", "updated_at", "user_id") SELECT "conversation_id", "created_at", "message", "message_id", "updated_at", "user_id" FROM "message";
DROP TABLE "message";
ALTER TABLE "new_message" RENAME TO "message";
CREATE TABLE "new_user_on_conversation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "is_admin" INTEGER NOT NULL DEFAULT 1,
    "last_seen" TEXT,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "user_on_conversation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_on_conversation_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation" ("conversation_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_user_on_conversation" ("conversation_id", "created_at", "id", "is_admin", "last_seen", "updated_at", "user_id") SELECT "conversation_id", "created_at", "id", "is_admin", "last_seen", "updated_at", "user_id" FROM "user_on_conversation";
DROP TABLE "user_on_conversation";
ALTER TABLE "new_user_on_conversation" RENAME TO "user_on_conversation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
