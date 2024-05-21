const express = require('express');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const trainController = require('../controllers/train');
const bookingController = require('../controllers/booking');
const stationController = require('../controllers/station');
const authenticate = require('../middleware/auth');
const validate = require("../middleware/validate");
const trainValidations = require("../validations/train.js");
const stationValidations = require("../validations/station.js");
const bookingValidations = require("../validations/booking.js");
const userValidations = require("../validations/user.js");
const router = express.Router();

// public routes
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

// private routes
router.use(authenticate);

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id',validate(userValidations.updateUsername), userController.updateUsername);
router.put('/users/password/:id',validate(userValidations.updatePassword), userController.changePassword);
router.delete('/users/:id', userController.deleteUser);

router.get('/trains', trainController.getAllTrains);
router.get('/trainsSorted', trainController.getAllTrainsSorted);
router.get('/trainsArrivals/:arrivalStationId', trainController.getAllTrainsByArrivalStation);
router.get('/trainsFilter/:departureStationId/:arrivalStationId?', trainController.getAllTrainsByDepartureAndArrivalStation);
router.get('/trains/:id', trainController.getTrainById);
router.post('/trains', validate(trainValidations.createTrain) , trainController.createTrain);
router.put('/trains/:id', validate(trainValidations.updateTrain) , trainController.updateTrain);
router.delete('/trains/:id', trainController.deleteTrain);

router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/:id', bookingController.getBookingById);
router.get('/bookingsByTrain/:trainId', bookingController.getAllBookingsByTrain);
router.get('/bookingsByUser/:userId', bookingController.getAllBookingsByUser);
router.post('/bookings',validate(bookingValidations.createBooking) , bookingController.createBooking);
router.put('/bookings/:id',validate(bookingValidations.updateBooking) , bookingController.updateBooking);
router.delete('/bookings/:id', bookingController.deleteBooking);

router.get('/stations', stationController.getAllStations);
router.get('/stations/:id', stationController.getStationById);
router.post('/stations',validate(stationValidations.station) , stationController.createStation);
router.put('/stations/:id', validate(stationValidations.station), stationController.updateStation);
router.delete('/stations/:id', stationController.deleteStation);

module.exports = router;
