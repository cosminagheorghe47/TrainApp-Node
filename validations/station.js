const Joi = require("joi");

const station = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  code: Joi.string().max(5).required(),
});

const updateStation = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    code: Joi.string().max(5).required(),
});

module.exports=  {
    station
};
