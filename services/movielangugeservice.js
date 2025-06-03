const prisma = require('../utils/prismaclient');

async function createMovieLanguage(data) {
  if (!data.movieId || !data.language) {
    const error = new Error('movieId and language are required');
    error.statusCode = 400;
    throw error;
  }

  try {
    return await prisma.movieLanguage.create({ data });
  } catch (error) {
    if (error.code === 'P2002') {
      const duplicateError = new Error('This language is already added for the movie');
      duplicateError.statusCode = 409;
      throw duplicateError;
    }
    throw error;
  }
}

async function getLanguagesByMovieId(movieId) {
  if (!movieId) {
    throw new Error('movieId is required');
  }

  try {
    return await prisma.movieLanguage.findMany({
      where: { movieId: Number(movieId) },
    });
  } catch (error) {
    throw error;
  }
}

async function updateMovieLanguage(id, data) {
  if (!id) {
    throw new Error('id is required');
  }

  // Check existence
  const existing = await prisma.movieLanguage.findUnique({
    where: { id: Number(id) },
  });
  if (!existing) {
    const error = new Error('Movie language entry not found');
    error.statusCode = 404;
    throw error;
  }

  try {
    return await prisma.movieLanguage.update({
      where: { id: Number(id) },
      data,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      const duplicateError = new Error('This language is already added for the movie');
      duplicateError.statusCode = 409;
      throw duplicateError;
    }
    throw error;
  }
}

async function deleteMovieLanguage(id) {
  if (!id) {
    throw new Error('id is required');
  }

  const existing = await prisma.movieLanguage.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) {
    const error = new Error('Language not found');
    error.statusCode = 404;
    throw error;
  }

  try {
    return await prisma.movieLanguage.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createMovieLanguage,
  getLanguagesByMovieId,
  updateMovieLanguage,
  deleteMovieLanguage,
};
