/*
  Warnings:

  - You are about to drop the column `price` on the `Seat` table. All the data in the column will be lost.
  - Added the required column `price` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "price";
