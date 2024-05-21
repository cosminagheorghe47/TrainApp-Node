const Train = require('../models/Train');

exports.getAllTrains = async (req, res) => {
  try {
    const trains = await Train.findAll();
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching trains' });
  }
};

exports.getAllTrainsSorted = async (req, res) => {
  try {
    const trains = await Train.findAll({
      order: [
        ['dateTimeDeparture', 'ASC'] 
      ]
    });
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching trains' });
  }
};

exports.getAllTrainsByArrivalStation = async (req, res) => {
  const { arrivalStationId } = req.params;
  try {
    const trains = await Train.findAll({
      where: { arrivalStationId },
      order: [
        ['dateTimeDeparture', 'ASC'] 
      ]
    });
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching trains' });
  }
};
exports.getAllTrainsByDepartureAndArrivalStation = async (req, res) => {
  const { departureStationId, arrivalStationId } = req.params;

  if (!departureStationId) {
    return res.status(400).json({ error: 'departureStationId is required' });
  }

  const whereCondition = { departureStationId };

  if (arrivalStationId) {
    whereCondition.arrivalStationId = arrivalStationId;
  }
  // else{
  //   return res.status(400).json({ error: 'arrivalStationId is required' });
  // }
  try {
    const trains = await Train.findAll({
      where: whereCondition,
      order: [
        ['dateTimeDeparture', 'ASC'] 
      ]
    });
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching trains' });
  }
};

exports.getTrainById = async (req, res) => {
  const { id } = req.params;
  try {
    const train = await Train.findByPk(id);
    if (!train) {
      return res.status(404).json({ error: 'Train not found' });
    }
    res.json(train);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the train' });
  }
};

exports.createTrain = async (req, res) => {
  const { name, number, departureStationId, arrivalStationId, dateTimeDeparture, dateTimeArrival, emptySeats } = req.body;
  try {
    const train = await Train.create({ name, number, departureStationId, arrivalStationId, dateTimeDeparture, dateTimeArrival, emptySeats });
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the train' });
  }
};

exports.updateTrain = async (req, res) => {
  const { id } = req.params;
  const { name, number, departureStationId, arrivalStationId, dateTimeDeparture, dateTimeArrival, emptySeats } = req.body;
  try {
    const train = await Train.findByPk(id);
    if (!train) {
      return res.status(404).json({ error: 'Train not found' });
    }
    train.name = name;
    train.dateTimeDeparture = dateTimeDeparture;
    train.dateTimeArriva = dateTimeArrival;
    train.emptySeats = emptySeats;
    await train.save();
    res.json(train);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the train' });
  }
};

exports.deleteTrain = async (req, res) => {
  const { id } = req.params;
  try {
    const train = await Train.findByPk(id);
    if (!train) {
      return res.status(404).json({ error: 'Train not found' });
    }
    await train.destroy();
    res.json({ message: 'Train deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the train' });
  }
};
