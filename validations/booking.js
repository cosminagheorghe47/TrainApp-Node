const Joi = require("joi");

const createBooking = Joi.object({
  userId: Joi.string().max(5).required(),
  trainId: Joi.number().max(5).required(),
  seatNumber: Joi.number().required()
});

const updateBooking = Joi.object({
    trainId: Joi.number().max(5).required(),
    seatNumber: Joi.number().required()
});

module.exports=  {
    createBooking,
    updateBooking,
};
