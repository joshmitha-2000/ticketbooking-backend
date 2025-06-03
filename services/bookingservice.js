
const prisma = require('../utils/prismaclient');
// Get all bookings of a user with movie, theatre, seats, total price
async function getUserBookings(userId) {
  return prisma.booking.findMany({
    where: { userId },
    include: {
      show: {
        include: {
          movie: { select: { title: true } },
          theatre: { select: { name: true } },
        },
      },
      seats: { select: { id: true, seatNumber: true } },
    },
  });
}

// Get a particular booking by id for a user
async function getUserBookingById(userId, bookingId) {
  return prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId,
    },
    include: {
      show: {
        include: {
          movie: { select: { title: true, description: true } },
          theatre: { select: { name: true, location: true } },
        },
      },
      seats: { select: { id: true, seatNumber: true, seatType: true } },
    },
  });
}

// Admin: Get all bookings with user info, movie, amount
async function getAllBookings() {
  const bookings = await prisma.booking.findMany({
    include: {
      user: { select: { name: true, email: true } },
      show: {
        include: {
          movie: { select: { title: true } },
        },
      },
    },
  });

  return bookings.map((b) => ({
    bookingId: b.id,
    userName: b.user.name,
    userEmail: b.user.email,
    movieTitle: b.show.movie.title,
    totalPrice: b.totalPrice,
    status: b.status,
    createdAt: b.createdAt,
  }));
}

// Create booking: check seats, confirm if available, else error
async function createBooking(userId, showId, seatIds) {
  if (!showId || !Array.isArray(seatIds) || seatIds.length === 0) {
    throw new Error('Show ID and seat IDs are required.');
  }

  return prisma.$transaction(async (tx) => {
    // Check seat availability
    const seats = await tx.seat.findMany({
      where: {
        id: { in: seatIds },
        showId,
        isBooked: false,
      },
    });

    if (seats.length !== seatIds.length) {
      throw new Error('One or more seats are already booked.');
    }

    // Get movie price for total
    const show = await tx.show.findUnique({
      where: { id: showId },
      include: { movie: true },
    });

    if (!show) throw new Error('Show not found.');

    const totalPrice = seats.length * show.movie.price;

    // Create booking with status CONFIRMED
    const booking = await tx.booking.create({
      data: {
        userId,
        showId,
        totalPrice,
        status: 'CONFIRMED',
        seats: {
          connect: seatIds.map((id) => ({ id })),
        },
      },
      include: { seats: true },
    });

    // Mark seats booked
    await tx.seat.updateMany({
      where: { id: { in: seatIds } },
      data: {
        isBooked: true,
        bookingId: booking.id,
      },
    });

    return booking;
  });
}

module.exports = {
  getUserBookings,
  getUserBookingById,
  getAllBookings,
  createBooking,
};
