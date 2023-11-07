const Joi = require("joi");

const planetPostSchema = Joi.object({
  name: Joi.string().required().trim().max(40).messages({
    "string.base": "The name must be a string",
    "string.empty": "The name cannot be empty",
    "string.required": "The name is required",
    "string.max": "The name cannot be more than 40",
  }),
  rotation_period: Joi.string().default("12").messages({
    "string.base": "The rotation period must be a string",
  }),
  orbital_period: Joi.string().default("365").messages({
    "string.base": "The orbital period must be a string",
  }),
  diameter: Joi.string().default("12742").messages({
    "string.base": "The diameter must be a string",
  }),
  climate: Joi.string().messages({
    "string.base": "The climate must be a string",
  }),
  gravity: Joi.string().messages({
    "string.base": "The gravity must be a string",
  }),
  terrain: Joi.string().messages({
    "string.base": "The terrain must be a string",
  }),
  surface_water: Joi.string().default("8").messages({
    "string.base": "The surface water must be a string",
  }),
  population: Joi.string().default("70000000000").messages({
    "string.base": "The population must be a string",
  }),
}).options({ abortEarly: false });

function validatePostPlanet(req, res, next) {
  const { error, value } = planetPostSchema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(" ");
    return res.status(400).json({ error: errorMessage });
  }

  req.body = value;
  next();
}

module.exports = { validatePostPlanet };
