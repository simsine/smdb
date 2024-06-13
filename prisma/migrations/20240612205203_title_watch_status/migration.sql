-- CreateEnum
CREATE TYPE "WatchStatus" AS ENUM ('PLAN_TO_WATCH', 'WATCHING', 'ON_HOLD', 'COMPLETED', 'DROPPED');

-- CreateTable
CREATE TABLE "UserTitleStatus" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imdbID" TEXT NOT NULL,
    "watchStatus" "WatchStatus" NOT NULL DEFAULT 'PLAN_TO_WATCH',
    "currentSeason" INTEGER NOT NULL DEFAULT 0,
    "currentEpisode" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserTitleStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTitleStatus_userId_imdbID_key" ON "UserTitleStatus"("userId", "imdbID");

-- AddForeignKey
ALTER TABLE "UserTitleStatus" ADD CONSTRAINT "UserTitleStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
