const Joi = require("joi");

const peoplePostSchema = Joi.object({
  name: Joi.string().required().trim().max(40).messages({
    "string.base": "The name must be a string",
    "string.empty": "The name cannot be empty",
    "string.required": "The name is required",
    "string.max": "The name cannot be more than 40",
  }),
  height: Joi.number().default(175).messages({
    "number.base": "The height must be a number",
  }),
  mass: Joi.string().messages({
    "string.base": "The mass must be a string",
  }),
  hair_color: Joi.string().messages({
    "string.base": "The hair color must be a string",
  }),
  skin_color: Joi.string().messages({
    "string.base": "The skin color must be a string",
  }),
  eye_color: Joi.string().messages({
    "string.base": "The eye color must be a string",
  }),
  birth_year: Joi.string().messages({
    "string.base": "The birth year must be a string",
  }),
  gender: Joi.string().messages({
    "string.base": "The gender must be a string",
  }),
  homeworld: Joi.string().messages({
    "string.base": "The homeworld must be a string",
  }),
}).options({ abortEarly: false });

function validatePostPeople(req, res, next) {
  const { error, value } = peoplePostSchema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(" ");
    return res.status(400).json({ error: errorMessage });
  }

  req.body = value;
  next();
}

module.exports = { validatePostPeople };
