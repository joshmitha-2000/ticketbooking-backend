const prisma = require('../utils/prismaclient');

async function getAllMovies() {
  try {
    return await prisma.movie.findMany({
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error('Error fetching all movies:', error);
    throw error;
  }
}

async function getMovieById(id) {
  try {
    const now = new Date();

    const movie = await prisma.movie.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        shows: {
          where: {
            showTime: {
              gt: now,
            },
          },
          include: {
            theatre: true,
            seats: true,
          },
        },
        languageTags: true,
        availableDates: true,
      },
    });

    if (!movie) return null;

    const theatresMap = new Map();

    for (const show of movie.shows) {
      const tId = show.theatre.id;

      if (!theatresMap.has(tId)) {
        theatresMap.set(tId, {
          id: tId,
          name: show.theatre.name,
          location: show.theatre.location,
          shows: [],
        });
      }

      const availableSeatsCount = show.seats.filter(seat => !seat.isBooked).length;

      theatresMap.get(tId).shows.push({
        id: show.id,
        showTime: show.showTime,
        availableSeats: availableSeatsCount,
      });
    }

    const theatres = Array.from(theatresMap.values());

    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      posterUrl: movie.posterUrl,
      runtime: movie.runtime,
      price: movie.price,
      languageTags: movie.languageTags.map(lang => lang.language),
      category: movie.category,
      availableDates: movie.availableDates.map(d => d.date),
      theatres,
    };
  } catch (error) {
    console.error('Error fetching movie by id:', error);
    throw error;
  }
}

async function createMovie(data) {
  try {
    const { categoryId, languageTags = [], availableDates = [], ...rest } = data;

    return await prisma.movie.create({
      data: {
        ...rest,
        category: categoryId ? { connect: { id: Number(categoryId) } } : undefined,
        languageTags: {
          create: languageTags.map(language => ({ language })),
        },
        availableDates: {
          create: availableDates.map(date => ({ date: new Date(date) })),
        },
      },
      include: {
        category: true,
        languageTags: true,
        availableDates: true,
      },
    });
  } catch (error) {
    console.error('Error creating movie:', error);
    throw error;
  }
}

async function updateMovie(id, data) {
  try {
    const { categoryId, languageTags, availableDates, ...rest } = data;

    return await prisma.$transaction(async (tx) => {
      // Update main movie fields + category relation
      const updatedMovie = await tx.movie.update({
        where: { id: Number(id) },
        data: {
          ...rest,
          category: categoryId
            ? { connect: { id: Number(categoryId) } }
            : { disconnect: true },
        },
      });

      // Replace languageTags if provided
      if (languageTags) {
        await tx.movieLanguage.deleteMany({ where: { movieId: updatedMovie.id } });
        if (languageTags.length > 0) {
          await tx.movieLanguage.createMany({
            data: languageTags.map(language => ({ language, movieId: updatedMovie.id })),
          });
        }
      }

      // Replace availableDates if provided
      if (availableDates) {
        await tx.movieDate.deleteMany({ where: { movieId: updatedMovie.id } });
        if (availableDates.length > 0) {
          await tx.movieDate.createMany({
            data: availableDates.map(date => ({ date: new Date(date), movieId: updatedMovie.id })),
          });
        }
      }

      return await tx.movie.findUnique({
        where: { id: updatedMovie.id },
        include: {
          category: true,
          languageTags: true,
          availableDates: true,
        },
      });
    });
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
}
async function deleteMovie(id) {
  try {
    const movieId = Number(id);

    await prisma.movieLanguage.deleteMany({ where: { movieId } });
    await prisma.movieDate.deleteMany({ where: { movieId } });
    await prisma.show.deleteMany({ where: { movieId } });

    return await prisma.movie.delete({
      where: { id: movieId },
    });
  } catch (error) {
    console.error('Error deleting movie:', error.message || error);
    throw error;
  }
}


module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
