const Joi = require('@hapi/joi');

const schema = Joi.object({
  username: Joi.string()
               .alphanum()
               .pattern(/(?=.*[a-z]|[A-Z])/)
               .min(3).max(30)
               .required(),
  password: Joi.string()
               .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
               .max(50)
               .required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  bday: Joi.date().required()
});

function validateRegister (req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  next();
}

module.exports = validateRegister;
