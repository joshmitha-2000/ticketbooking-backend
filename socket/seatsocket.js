const seatService = require('../services/seatservice');

module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);

    // Join specific show room
    socket.on('joinShow', async (showId) => {
      try {
        if (!showId) return;

        socket.join(`show_${showId}`);
        console.log(`Socket ${socket.id} joined room: show_${showId}`);

        const seats = await seatService.getSeatsByShowId(showId);
        const seatStatus = seats.map(seat => ({
          id: seat.id,
          seatNumber: seat.seatNumber,
          isBooked: seat.isBooked,
          price: seat.price,
          seatType: seat.seatType,
        }));

        // Send current seat status only to the joined user
        socket.emit('seats', seatStatus);
      } catch (error) {
        console.error('❌ Error in joinShow:', error.message);
        socket.emit('error', 'Could not fetch seat data.');
      }
    });

    // Book a seat (single seat booking)
    socket.on('bookSeat', async ({ showId, seatIndex }) => {
      try {
        if (!showId || seatIndex === undefined) return;

        const seats = await seatService.getSeatsByShowId(showId);
        const seatToBook = seats[seatIndex];

        if (!seatToBook) {
          socket.emit('seatError', 'Invalid seat index.');
          return;
        }

        if (seatToBook.isBooked) {
          socket.emit('seatError', 'Seat already booked.');
          return;
        }

        // Lock seat by updating DB
        await seatService.updateSeat(seatToBook.id, { isBooked: true });

        // Fetch updated seat data
        const updatedSeats = await seatService.getSeatsByShowId(showId);
        const updatedSeatStatus = updatedSeats.map(seat => ({
          id: seat.id,
          seatNumber: seat.seatNumber,
          isBooked: seat.isBooked,
          price: seat.price,
          seatType: seat.seatType,
        }));

        // Notify all users in the room with updated seats
        io.to(`show_${showId}`).emit('seats', updatedSeatStatus);
      } catch (error) {
        console.error('❌ Error in bookSeat:', error.message);
        socket.emit('seatError', 'Booking failed.');
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });
};
