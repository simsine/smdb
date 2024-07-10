/*
  Warnings:

  - You are about to drop the column `userAuthToken` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_userAuthToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userAuthToken";

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
