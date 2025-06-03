const prisma = require('../utils/prismaclient');

async function createSeatsForTheatre(theatreId) {
  const theatre = await prisma.theatre.findUnique({
    where: { id: Number(theatreId) },
    include: {
      shows: {
        include: { movie: true },
      },
    },
  });

  if (!theatre) throw new Error('Theatre not found');
  if (!theatre.shows || theatre.shows.length === 0) {
    throw new Error('No shows found for this theatre');
  }

  const seatCapacity = theatre.seatCapacity;

  for (const show of theatre.shows) {
    const seatsData = [];
    for (let i = 1; i <= seatCapacity; i++) {
      seatsData.push({
        showId: show.id,
        seatNumber: i.toString(),
        seatType: 'Regular',
        isBooked: false,
        theatreId: theatre.id,
      });
    }

    await prisma.$transaction([
      prisma.seat.deleteMany({ where: { showId: show.id } }),
      prisma.seat.createMany({ data: seatsData, skipDuplicates: true }),
    ]);
  }

  return `Seats created for theatre ${theatre.name} on ${theatre.shows.length} shows.`;
}

async function createSeatsForShow(showId) {
  const show = await prisma.show.findUnique({
    where: { id: Number(showId) },
    include: { theatre: true },
  });

  if (!show) throw new Error('Show not found');

  const seatCapacity = show.theatre.seatCapacity;
  const seatsData = [];

  for (let i = 1; i <= seatCapacity; i++) {
    seatsData.push({
      showId: show.id,
      seatNumber: i.toString(),
      seatType: 'Regular',
      isBooked: false,
      theatreId: show.theatre.id,
    });
  }

  await prisma.$transaction([
    prisma.seat.deleteMany({ where: { showId: show.id } }),
    prisma.seat.createMany({ data: seatsData, skipDuplicates: true }),
  ]);

  return `Seats created for show ${show.id} in theatre ${show.theatre.name}`;
}

async function getSeatsByShowId(showId) {
  return await prisma.seat.findMany({
    where: { showId: Number(showId) },
    select: {
      id: true,
      seatNumber: true,
      seatType: true,
      isBooked: true,
    },
    orderBy: { seatNumber: 'asc' }, // optional, if you want ordered seats
  });
}

module.exports = {
  createSeatsForTheatre,
  createSeatsForShow,
  getSeatsByShowId,
};
