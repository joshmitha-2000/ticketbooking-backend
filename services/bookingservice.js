const prisma = require('../utils/prismaclient');

async function getBookingsByUserId(userId) {
  return await prisma.booking.findMany({
    where: { userId },
    include: {
      seats: true,
      show: {
        include: {
          movie: true,
          theatre: true,
        }
      },
    }
  });
}

async function getBookingByIdAndUserId(bookingId, userId) {
  return await prisma.booking.findFirst({
    where: { id: bookingId, userId },
    include: {
      seats: true,
      show: {
        include: {
          movie: true,
          theatre: true,
        }
      },
    }
  });
}

async function createBooking(userId, showId, seatIds, totalPrice) {
  // Mark seats as booked and create booking atomically with a transaction
  return await prisma.$transaction(async (prisma) => {
    // Check seats availability first
    const seats = await prisma.seat.findMany({
      where: {
        id: { in: seatIds },
        showId,
        isBooked: false,
      },
    });

    if (seats.length !== seatIds.length) {
      throw new Error('One or more seats are already booked');
    }

    // Mark seats as booked
    await prisma.seat.updateMany({
      where: { id: { in: seatIds } },
      data: { isBooked: true },
    });

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        showId,
        totalPrice,
        seats: {
          connect: seatIds.map(id => ({ id })),
        },
      },
      include: {
        seats: true,
      },
    });

    return booking;
  });
}

async function updateBooking(bookingId, userId, seatIds, totalPrice) {
  return await prisma.$transaction(async (prisma) => {
    // Find booking for user
    const booking = await prisma.booking.findFirst({
      where: { id: bookingId, userId },
      include: { seats: true },
    });
    if (!booking) return null;

    // Release old seats
    const oldSeatIds = booking.seats.map(seat => seat.id);
    await prisma.seat.updateMany({
      where: { id: { in: oldSeatIds } },
      data: { isBooked: false },
    });

    // Check new seats availability
    const seats = await prisma.seat.findMany({
      where: {
        id: { in: seatIds },
        showId: booking.showId,
        isBooked: false,
      },
    });

    if (seats.length !== seatIds.length) {
      throw new Error('One or more new seats are already booked');
    }

    // Mark new seats as booked
    await prisma.seat.updateMany({
      where: { id: { in: seatIds } },
      data: { isBooked: true },
    });

    // Update booking with new seats and price
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        totalPrice,
        seats: {
          set: seatIds.map(id => ({ id })),
        },
      },
      include: {
        seats: true,
      },
    });

    return updatedBooking;
  });
}

async function deleteBooking(bookingId, userId) {
  return await prisma.$transaction(async (prisma) => {
    const booking = await prisma.booking.findFirst({
      where: { id: bookingId, userId },
      include: { seats: true },
    });
    if (!booking) return null;

    // Release booked seats
    const seatIds = booking.seats.map(seat => seat.id);
    await prisma.seat.updateMany({
      where: { id: { in: seatIds } },
      data: { isBooked: false },
    });

    // Delete booking
    await prisma.booking.delete({
      where: { id: bookingId },
    });

    return true;
  });
}

module.exports = {
  getBookingsByUserId,
  getBookingByIdAndUserId,
  createBooking,
  updateBooking,
  deleteBooking,
};
