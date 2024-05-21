const Joi = require('joi');



const validate = (validationSchema) => (req, res, next) => {
  const validationResult = validationSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.details });
  }

  next();
};

module.exports = validate;