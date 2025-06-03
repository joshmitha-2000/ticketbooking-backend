const prisma = require('../utils/prismaclient');

async function createMovieDate(data) {
  const { movieId, date } = data;

  if (!movieId || !date) {
    const error = new Error('movieId and date are required');
    error.statusCode = 400;
    throw error;
  }

  // Check if movie exists
  const movieExists = await prisma.movie.findUnique({
    where: { id: Number(movieId) },
  });

  if (!movieExists) {
    const error = new Error('Movie not found');
    error.statusCode = 404;
    throw error;
  }

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    const error = new Error('Invalid date format');
    error.statusCode = 400;
    throw error;
  }

  try {
    return await prisma.movieDate.upsert({
      where: {
        date_movieId: {
          date: dateObj,
          movieId: Number(movieId),
        },
      },
      update: {}, // no update on create
      create: {
        movieId: Number(movieId),
        date: dateObj,
      },
    });
  } catch (error) {
    if (error.code === 'P2002') {
      const duplicateError = new Error('This date is already added for the movie');
      duplicateError.statusCode = 409;
      throw duplicateError;
    }
    throw error;
  }
}

async function getDatesByMovieId(movieId) {
  if (!movieId) {
    throw new Error('movieId is required');
  }

  return await prisma.movieDate.findMany({
    where: { movieId: Number(movieId) },
  });
}

// New: Delete a movie date by movieId and date
async function deleteMovieDate(movieId, date) {
  if (!movieId || !date) {
    const error = new Error('movieId and date are required for deletion');
    error.statusCode = 400;
    throw error;
  }
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    const error = new Error('Invalid date format');
    error.statusCode = 400;
    throw error;
  }

  try {
    return await prisma.movieDate.delete({
      where: {
        date_movieId: {
          movieId: Number(movieId),
          date: dateObj,
        },
      },
    });
  } catch (error) {
    if (error.code === 'P2025') { // record not found
      const notFoundError = new Error('Date not found for the movie');
      notFoundError.statusCode = 404;
      throw notFoundError;
    }
    throw error;
  }
}

// New: Update a movie date's date value (change oldDate to newDate for a movie)
async function updateMovieDate(movieId, oldDate, newDate) {
  if (!movieId || !oldDate || !newDate) {
    const error = new Error('movieId, oldDate and newDate are required for update');
    error.statusCode = 400;
    throw error;
  }

  const oldDateObj = new Date(oldDate);
  const newDateObj = new Date(newDate);
  if (isNaN(oldDateObj.getTime()) || isNaN(newDateObj.getTime())) {
    const error = new Error('Invalid date format');
    error.statusCode = 400;
    throw error;
  }

  try {
    return await prisma.movieDate.update({
      where: {
        date_movieId: {
          movieId: Number(movieId),
          date: oldDateObj,
        },
      },
      data: {
        date: newDateObj,
      },
    });
  } catch (error) {
    if (error.code === 'P2025') {
      const notFoundError = new Error('Date not found for the movie');
      notFoundError.statusCode = 404;
      throw notFoundError;
    }
    if (error.code === 'P2002') {
      const duplicateError = new Error('This new date already exists for the movie');
      duplicateError.statusCode = 409;
      throw duplicateError;
    }
    throw error;
  }
}

module.exports = {
  createMovieDate,
  getDatesByMovieId,
  deleteMovieDate,
  updateMovieDate,
};
