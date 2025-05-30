const prisma = require('../utils/prismaclient');

async function getSeatsByShowId(showId) {
  return await prisma.seat.findMany({
    where: { showId },
    orderBy: { seatNumber: 'asc' }
  });
}

async function createSeat(showId, seatNumber, seatType, price) {
  return await prisma.seat.create({
    data: {
      showId,
      seatNumber,
      seatType,
      price,
      isBooked: false,
    },
  });
}

async function updateSeat(seatId, data) {
  // data can include seatNumber, seatType, price, isBooked
  try {
    return await prisma.seat.update({
      where: { id: seatId },
      data,
    });
  } catch (error) {
    // If seat not found, Prisma throws error
    if (error.code === 'P2025') return null; 
    throw error;
  }
}

async function deleteSeat(seatId) {
  try {
    await prisma.seat.delete({
      where: { id: seatId },
    });
    return true;
  } catch (error) {
    if (error.code === 'P2025') return false;
    throw error;
  }
}

module.exports = {
  getSeatsByShowId,
  createSeat,
  updateSeat,
  deleteSeat,
};
