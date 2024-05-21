const express = require('express');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/index');
const Train = require('./models/Train'); 
const User = require('./models/User');
const Booking = require('./models/Booking');
const Station = require('./models/Station');
// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users');
// const trainRoutes = require('./routes/trains');
// const bookingRoutes = require('./routes/bookings');
// const stationRoutes = require('./routes/stations');

const app = express();
const port = 8000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes)
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/trains', trainRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/stations', stationRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    await sequelize.sync({ force: false });
    console.log('Database synchronized.');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
