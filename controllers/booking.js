const Booking = require('../models/Booking');
const Train = require('../models/Train');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching bookings' });
  }
};

exports.getAllBookingsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.findAll({
      where: { userId }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching bookings' });
  }
};
exports.getAllBookingsByTrain = async (req, res) => {
  const { trainId } = req.params;
  try {
    const bookings = await Booking.findAll({
      where: { trainId }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching bookings' });
  }
};

exports.getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the booking' });
  }
};

exports.createBooking = async (req, res) => {
  const { userId, trainId, seatNumber } = req.body;
  try {
    const booking = await Booking.create({ userId, trainId, seatNumber });
    const train = await Train.findByPk(booking.trainId);
    if (train) {
        train.emptySeats -= 1;
        await train.save();
      }
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the booking' });
  }
};

exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { userId, trainId, seatNumber } = req.body;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    if(booking.trainId != trainId){
        const train = await Train.findByPk(booking.trainId);
        if (train) {
            train.emptySeats += 1;
            await train.save();
          }
          const trainNew = await Train.findByPk(trainId);
            if (trainNew) {
                trainNew.emptySeats -= 1;
                await trainNew.save();
            }
    }
    booking.userId = userId;
    booking.trainId = trainId;
    booking.seatNumber = seatNumber;
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the booking' });
  }
};

exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    const train = await Train.findByPk(booking.trainId);
        if (train) {
            train.emptySeats += 1;
            await train.save();
          }
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    await booking.destroy();
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the booking' });
  }
};
