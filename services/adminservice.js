const prisma = require('../utils/prismaclient');

async function getAdminDashboardData() {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const [totalMovies, todayBookings, todayShows] = await Promise.all([
    prisma.movie.count(),
    prisma.booking.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        totalPrice: true,
      },
    }),
    prisma.show.findMany({
      where: {
        showTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        movie: {
          select: {
            title: true,
          },
        },
        theatre: {
          select: {
            name: true,
          },
        },
        seats: {
          select: {
            isBooked: true,
          },
        },
      },
    }),
  ]);

  const totalRevenueToday = todayBookings.reduce(
    (sum, booking) => sum + booking.totalPrice,
    0
  );

  let totalSeatsBookedToday = 0;
  let totalSeatsAvailableToday = 0;

  for (const show of todayShows) {
    for (const seat of show.seats) {
      if (seat.isBooked) totalSeatsBookedToday++;
      totalSeatsAvailableToday++;
    }
  }

  const todayShowsList = todayShows.map(show => ({
    movieTitle: show.movie.title,
    theatreName: show.theatre.name,
    showTime: show.showTime,
  }));

  return {
    totalMovies,
    totalBookingsToday: todayBookings.length,
    totalRevenueToday,
    totalSeatsBookedToday,
    totalSeatsAvailableToday,
    todayShowsList, // NEW
  };
}

module.exports = {
  getAdminDashboardData,
};
