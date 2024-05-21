const Joi = require("joi");

const updateUsername = Joi.object({
    username: Joi.string().max(30).required(),
});
const updatePassword = Joi.object({
    password: Joi.string().min(6).max(30).required(),
});
module.exports=  {
    updateUsername,
    updatePassword
};
