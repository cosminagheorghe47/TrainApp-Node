const Station = require('../models/Station');

exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.findAll();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching stations' });
  }
};

exports.getStationById = async (req, res) => {
  const { id } = req.params;
  try {
    const station = await Station.findByPk(id);
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    res.json(station);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the station' });
  }
};

exports.createStation = async (req, res) => {
  const { name, code } = req.body;
  try {
    const station = await Station.create({ name, code });
    res.status(201).json(station);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the station' });
  }
};

exports.updateStation = async (req, res) => {
  const { id } = req.params;
  const { name, code } = req.body;
  try {
    const station = await Station.findByPk(id);
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    station.name = name;
    station.code = code;
    await station.save();
    res.json(station);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the station' });
  }
};

exports.deleteStation = async (req, res) => {
  const { id } = req.params;
  try {
    const station = await Station.findByPk(id);
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    await station.destroy();
    res.json({ message: 'Station deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the station' });
  }
};
