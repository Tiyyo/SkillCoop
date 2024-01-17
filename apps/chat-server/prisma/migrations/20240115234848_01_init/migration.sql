-- CreateTable
CREATE TABLE "convertion_type" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT
);

-- CreateTable
CREATE TABLE "message" (
    "message_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "conversation" (
    "conversation_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "type_name" TEXT NOT NULL,
    "event_id" INTEGER,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    CONSTRAINT "conversation_type_name_fkey" FOREIGN KEY ("type_name") REFERENCES "convertion_type" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "message_on_conversation" (
    "message_id" INTEGER NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("message_id", "conversation_id"),
    CONSTRAINT "message_on_conversation_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "message" ("message_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "message_on_conversation_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation" ("conversation_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_on_conversation" (
    "user_id" INTEGER NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "is_admin" INTEGER NOT NULL DEFAULT 1,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    PRIMARY KEY ("user_id", "conversation_id"),
    CONSTRAINT "user_on_conversation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_on_conversation_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation" ("conversation_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "convertion_type_name_key" ON "convertion_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

INSERT INTO "convertion_type" (name, created_at) VALUES ('event', date('now'));
INSERT INTO "convertion_type" (name, created_at) VALUES ('oneToOne', date('now'));
INSERT INTO "convertion_type" (name, created_at) VALUES ('group', date('now'));

