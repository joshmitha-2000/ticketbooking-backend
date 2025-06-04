const prisma = require('../utils/prismaclient');

// Get all shows with related info
async function getAllShows() {
  return await prisma.show.findMany({
    include: {
      movie: true,
      theatre: true,
      seats: true,
      bookings: true,
    },
  });
}

// Get a specific show by ID, optionally only available seats
async function getShowById(id, onlyAvailableSeats = false) {
  const show = await prisma.show.findUnique({
    where: { id: Number(id) },
    include: {
      movie: true,
      theatre: true,
      seats: {
        where: onlyAvailableSeats ? { isBooked: false } : undefined,
        orderBy: { seatNumber: 'asc' },
      },
      bookings: true,
    },
  });

  if (!show) throw new Error('Show not found');
  return show;
}

// Create a new show
async function createShow(data) {
  const { theatreId, showTime, movieId } = data;

  if (!theatreId || !showTime || !movieId) {
    throw new Error('theatreId, showTime and movieId are required to create a show.');
  }

  // Get theatre info
  const theatre = await prisma.theatre.findUnique({
    where: { id: theatreId },
  });

  if (!theatre) {
    throw new Error('Theatre not found.');
  }

  // Limit to 3 shows per day in the theatre
  const showDate = new Date(showTime);
  const startOfDay = new Date(showDate.getFullYear(), showDate.getMonth(), showDate.getDate(), 0, 0, 0);
  const endOfDay = new Date(showDate.getFullYear(), showDate.getMonth(), showDate.getDate(), 23, 59, 59);

  const showCount = await prisma.show.count({
    where: {
      theatreId,
      showTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  if (showCount >= 3) {
    throw new Error('Cannot create more than 3 shows per day in the same theatre.');
  }

  // Check if show already exists at this time
  const existingShow = await prisma.show.findFirst({
    where: {
      theatreId,
      showTime: new Date(showTime),
    },
  });

  if (existingShow) {
    throw new Error('A show already exists at this time in the selected theatre.');
  }

  // Create show
  const createdShow = await prisma.show.create({
    data: {
      movieId,
      theatreId,
      showTime: new Date(showTime),
    },
  });

  // Create seats for the show
  const seatsToCreate = [];
  for (let i = 1; i <= theatre.seatCapacity; i++) {
    seatsToCreate.push({
      seatNumber: i.toString(),
      showId: createdShow.id,
      isBooked: false,
      seatType: 'Regular',
      theatreId: theatreId,
    });
  }

  await prisma.seat.createMany({
    data: seatsToCreate,
  });

  console.log(`✅ Show created with ID ${createdShow.id} and ${theatre.seatCapacity} seats`);
  return createdShow;
}

// Update a show
async function updateShowById(id, data) {
  return await prisma.show.update({
    where: { id: Number(id) },
    data,
  });
}

// Delete a show and its related bookings and seats (using transaction)
async function deleteShowById(id) {
  const showId = Number(id);

  return await prisma.$transaction(async (prisma) => {
    // Delete bookings related to this show
    await prisma.booking.deleteMany({
      where: { showId },
    });

    // Delete seats related to this show
    await prisma.seat.deleteMany({
      where: { showId },
    });

    // Delete the show itself
    return await prisma.show.delete({
      where: { id: showId },
    });
  });
}

// Get available (unbooked) seats for a show
async function getAvailableSeats(showId) {
  const seats = await prisma.seat.findMany({
    where: {
      showId: Number(showId),
      isBooked: false,
    },
    orderBy: { seatNumber: 'asc' },
  });

  return seats;
}

// Count of available seats (optional utility)
async function countAvailableSeats(showId) {
  return await prisma.seat.count({
    where: {
      showId: Number(showId),
      isBooked: false,
    },
  });
}

// Get all seats for a show (booked + unbooked)
async function getSeatsByShowId(showId) {
  return await prisma.seat.findMany({
    where: { showId: Number(showId) },
    orderBy: { seatNumber: 'asc' },
  });
}

module.exports = {
  getAllShows,
  getShowById,
  createShow,
  updateShowById,
  deleteShowById,
  getAvailableSeats,
  countAvailableSeats,
  getSeatsByShowId,
};
