const prisma = require('../utils/prismaclient');

async function getAllMovies() {
  return await prisma.movie.findMany();
}

async function getMovieById(id) {
  return await prisma.movie.findUnique({
    where: { id: Number(id) },
  });
}

async function createMovie(data) {
  return await prisma.movie.create({
    data,
  });
}

async function updateMovie(id, data) {
  return await prisma.movie.update({
    where: { id: Number(id) },
    data,
  });
}

async function deleteMovie(id) {
  return await prisma.movie.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
