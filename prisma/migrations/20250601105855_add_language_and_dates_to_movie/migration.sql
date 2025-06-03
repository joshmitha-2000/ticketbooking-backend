/*
  Warnings:

  - You are about to drop the column `language` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the `MovieAvailability` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MovieAvailability" DROP CONSTRAINT "MovieAvailability_movieId_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "language";

-- DropTable
DROP TABLE "MovieAvailability";

-- CreateTable
CREATE TABLE "MovieLanguage" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "MovieLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieDate" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "MovieDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieLanguage_language_movieId_key" ON "MovieLanguage"("language", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "MovieDate_date_movieId_key" ON "MovieDate"("date", "movieId");

-- AddForeignKey
ALTER TABLE "MovieLanguage" ADD CONSTRAINT "MovieLanguage_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieDate" ADD CONSTRAINT "MovieDate_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
