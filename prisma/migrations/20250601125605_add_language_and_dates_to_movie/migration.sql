/*
  Warnings:

  - Added the required column `price` to the `Seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatType` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "seatType" TEXT NOT NULL;
