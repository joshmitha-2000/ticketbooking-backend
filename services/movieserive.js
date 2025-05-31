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
  const { categoryId, ...rest } = data;
  return await prisma.movie.create({
    data: {
      ...rest,
      category: categoryId
        ? {
            connect: { id: Number(categoryId) },
          }
        : undefined,
    },
  });
}

async function updateMovie(id, data) {
  const { categoryId, ...rest } = data;
  return await prisma.movie.update({
    where: { id: Number(id) },
    data: {
      ...rest,
      category: categoryId
        ? {
            connect: { id: Number(categoryId) },
          }
        : undefined,
    },
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
