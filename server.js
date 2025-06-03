const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/authrouter');
const userRoutes = require('./routes/userroute');
const movieRoutes = require('./routes/movieroute');
const showRoutes = require('./routes/showroutes');
const theatreRoutes = require('./routes/theatreroutes');
const BookingRoutes = require('./routes/bookingroute');
const SeatRoutes = require('./routes/seatroute');
const CategoryRoutes = require('./routes/categoruroutes');
const adminRoutes = require('./routes/adminroute');

const movielanguageRoutes = require('./routes/movielangugaeroute');
const moviedateRoutes = require('./routes/moviedateroutes');



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

// Import and run socket logic
require('./socket/seatsocket')(io);

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/theatres', theatreRoutes);
app.use('/api/booking', BookingRoutes);
app.use('/api/seat', SeatRoutes);
app.use('/api/category', CategoryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/movielanguages', movielanguageRoutes);
app.use('/moviedates', moviedateRoutes);



app.get('/', (req, res) => {
  res.send('Movie Ticket Backend API Running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
