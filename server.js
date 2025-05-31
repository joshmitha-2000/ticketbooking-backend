const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authrouter');
const userRoutes = require('./routes/userroute');
const movieRoutes = require('./routes/movieroute');
const showRoutes = require('./routes/showroutes');
const theatreRoutes = require('./routes/theatreroutes');
const BookingRoutes = require('./routes/bookingroute');
const SeatRoutes =require('./routes/seatroute');
const CategoryRoutes =require('./routes/categoruroutes')

const app = express();

app.use(cors());
app.use(express.json());

// Public and auth routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Movie, Show, Theatre routes (with admin protection inside route files)
app.use('/api/movies', movieRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/theatres', theatreRoutes);
app.use('/api/booking', BookingRoutes);
app.use('./api/seat',SeatRoutes)
app.use('./api/category',CategoryRoutes)

app.get('/', (req, res) => {
  res.send('Movie Ticket Backend API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
