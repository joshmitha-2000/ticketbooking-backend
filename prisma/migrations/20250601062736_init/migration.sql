-- CreateTable
CREATE TABLE "MovieAvailability" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieAvailability_movieId_key" ON "MovieAvailability"("movieId");

-- AddForeignKey
ALTER TABLE "MovieAvailability" ADD CONSTRAINT "MovieAvailability_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
