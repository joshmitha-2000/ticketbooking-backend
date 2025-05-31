const prisma = require('../utils/prismaclient');

async function getSeatsByShowId(showId) {
  return await prisma.seat.findMany({
    where: { showId: Number(showId) },
    orderBy: { seatNumber: 'asc' },
  });
}

async function createSeat(showId, seatNumber, seatType = null, price = null) {
  return await prisma.seat.create({
    data: {
      showId: Number(showId),
      seatNumber,
      seatType,
      price,
      isBooked: false,
    },
  });
}

async function updateSeat(seatId, data) {
  try {
    return await prisma.seat.update({
      where: { id: Number(seatId) },
      data,
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

async function deleteSeat(seatId) {
  try {
    await prisma.seat.delete({
      where: { id: Number(seatId) },
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
