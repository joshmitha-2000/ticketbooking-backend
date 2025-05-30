const prisma = require('../utils/prismaclient');

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

async function getShowById(id) {
  return await prisma.show.findUnique({
    where: { id: Number(id) },
    include: {
      movie: true,
      theatre: true,
      seats: true,
      bookings: true,
    },
  });
}

async function createShow(data) {
  return await prisma.show.create({
    data,
  });
}

async function updateShowById(id, data) {
  return await prisma.show.update({
    where: { id: Number(id) },
    data,
  });
}

async function deleteShowById(id) {
  return await prisma.show.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  getAllShows,
  getShowById,
  createShow,
  updateShowById,
  deleteShowById,
};
