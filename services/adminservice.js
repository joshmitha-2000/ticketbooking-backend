const prisma = require('../utils/prismaclient');

// Users
async function getAllUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      confirmed: true,
    },
  });
}

// Movies
async function createMovie(data) {
  const { title, description, duration, language } = data;
  return await prisma.movie.create({
    data: { title, description, duration, language },
  });
}

async function removeMovie(id) {
  return await prisma.movie.delete({ where: { id } });
}

// Theatres
async function createTheatre(data) {
  const { name, location, totalSeats } = data;
  return await prisma.theatre.create({
    data: { name, location, totalSeats },
  });
}

async function removeTheatre(id) {
  return await prisma.theatre.delete({ where: { id } });
}

// Shows
async function createShow(data) {
  const { movieId, theatreId, showTime } = data;
  return await prisma.show.create({
    data: {
      movieId,
      theatreId,
      showTime: new Date(showTime),
    },
  });
}

module.exports = {
  getAllUsers,
  createMovie,
  removeMovie,
  createTheatre,
  removeTheatre,
  createShow,
};
