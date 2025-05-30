const prisma = require('../utils/prismaclient');

// Get all theatres
async function getAllTheatres() {
  return await prisma.theatre.findMany();
}

// Get theatre by id
async function getTheatreById(id) {
  return await prisma.theatre.findUnique({
    where: { id: Number(id) },
  });
}

// Create a new theatre (expects an object with theatre data)
async function createTheatre(data) {
  return await prisma.theatre.create({
    data,
  });
}

// Update theatre by id (expects id and updated data object)
async function updateTheatreById(id, data) {
  return await prisma.theatre.update({
    where: { id: Number(id) },
    data,
  });
}

// Delete theatre by id
async function deleteTheatreById(id) {
  return await prisma.theatre.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  getAllTheatres,
  getTheatreById,
  createTheatre,
  updateTheatreById,
  deleteTheatreById,
};
