-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "date_of_birth" DATETIME NOT NULL,
    "avatar_url" TEXT,
    "skill_foot_id" INTEGER,
    CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_avatar_url_fkey" FOREIGN KEY ("avatar_url") REFERENCES "image" ("url") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "profile_skill_foot_id_fkey" FOREIGN KEY ("skill_foot_id") REFERENCES "skill_foot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "profile_on_profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adder_id" INTEGER NOT NULL,
    "friend_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "profile_on_profile_adder_id_fkey" FOREIGN KEY ("adder_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_profile_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "required_particpants" INTEGER NOT NULL,
    "num_teams" INTEGER NOT NULL DEFAULT 2,
    "organizerId" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "event_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "profile_on_event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "profile_on_event_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_on_event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "skill_foot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pace" INTEGER NOT NULL,
    "shooting" INTEGER NOT NULL,
    "passing" INTEGER NOT NULL,
    "dribbling" INTEGER NOT NULL,
    "defending" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "sport_id" INTEGER NOT NULL,
    "rater_id" INTEGER NOT NULL,
    "reviewee_id" INTEGER NOT NULL,
    CONSTRAINT "skill_foot_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skill_foot_rater_id_fkey" FOREIGN KEY ("rater_id") REFERENCES "profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "skill_foot_reviewee_id_fkey" FOREIGN KEY ("reviewee_id") REFERENCES "profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "size" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_username_key" ON "profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "sport_name_key" ON "sport"("name");

-- CreateIndex
CREATE UNIQUE INDEX "status_name_key" ON "status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "image_url_key" ON "image"("url");

-- CreateIndex
CREATE UNIQUE INDEX "image_key_key" ON "image"("key");
