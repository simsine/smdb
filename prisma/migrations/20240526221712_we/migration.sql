/*
  Warnings:

  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[authorId,imdbID]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_authorId_fkey";

-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_userId_fkey";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserProfile";

-- CreateIndex
CREATE UNIQUE INDEX "Review_authorId_imdbID_key" ON "Review"("authorId", "imdbID");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
