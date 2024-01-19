-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_message" (
    "message_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "message" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_message" ("created_at", "message", "message_id", "updated_at", "user_id") SELECT "created_at", "message", "message_id", "updated_at", "user_id" FROM "message";
DROP TABLE "message";
ALTER TABLE "new_message" RENAME TO "message";
CREATE TABLE "new_user_on_conversation" (
    "user_id" INTEGER NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "is_admin" INTEGER NOT NULL DEFAULT 1,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("user_id", "conversation_id"),
    CONSTRAINT "user_on_conversation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_on_conversation_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation" ("conversation_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_user_on_conversation" ("conversation_id", "created_at", "is_admin", "updated_at", "user_id") SELECT "conversation_id", "created_at", "is_admin", "updated_at", "user_id" FROM "user_on_conversation";
DROP TABLE "user_on_conversation";
ALTER TABLE "new_user_on_conversation" RENAME TO "user_on_conversation";
CREATE TABLE "new_message_on_conversation" (
    "message_id" INTEGER NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("message_id", "conversation_id"),
    CONSTRAINT "message_on_conversation_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "message" ("message_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "message_on_conversation_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation" ("conversation_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_message_on_conversation" ("conversation_id", "created_at", "message_id", "updated_at") SELECT "conversation_id", "created_at", "message_id", "updated_at" FROM "message_on_conversation";
DROP TABLE "message_on_conversation";
ALTER TABLE "new_message_on_conversation" RENAME TO "message_on_conversation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
