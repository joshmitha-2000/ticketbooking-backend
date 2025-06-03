-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "theatreId" INTEGER;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_theatreId_fkey" FOREIGN KEY ("theatreId") REFERENCES "Theatre"("id") ON DELETE SET NULL ON UPDATE CASCADE;
