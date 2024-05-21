const Joi = require("joi");

const createTrain = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  number: Joi.number().positive().required(),
  departureStationId: Joi.number().required(),
  arrivalStationId: Joi.number().required(),
  dateTimeDeparture: Joi.date().required(),
  dateTimeArrival: Joi.date().required(),
  emptySeats: Joi.number().positive().required()
});

const updateTrain = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  dateTimeDeparture: Joi.date().required(),
  dateTimeArrival: Joi.date().required(),
  emptySeats: Joi.number().positive().required()
});

module.exports=  {
  createTrain,
  updateTrain,
};
