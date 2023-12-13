import Joi from "joi";

export const bodyDTO = Joi.object({
  name: Joi.string().required().trim().max(40).messages({
    "string.base": "The name of the starship must be a string",
    "string.empty": "The name cannot be empty",
    "string.required": "The name is required",
    "string.max": "The name cannot be more than 40",
  }),
  model: Joi.string().messages({
    "string.base": "The model of the starship must be a string",
  }),
  manufacturer: Joi.string().messages({
    "string.base": "The manufacturer of the starship must be a string",
  }),
  cost_in_credits: Joi.string().default("10000000").messages({
    "string.base": "The cost in credits of the starship must be a string",
  }),
  length: Joi.string().default("10000").messages({
    "string.base": "The length of the starship must be a string",
  }),
  max_atmosphering_speed: Joi.string().messages({
    "string.base": "The maximum atmosphering speed of the starship must be a string",
  }),
  crew: Joi.string().default("100").messages({
    "string.base": "The crew of the starship must be a string",
  }),
  passengers: Joi.string().default("100").messages({
    "string.base": "The number of passengers of the starship must be a string",
  }),
  cargo_capacity: Joi.string().default("10000").messages({
    "string.base": "The cargo capacity of the starship must be a string",
  }),
  consumables: Joi.string().messages({
    "string.base": "The consumables of the starship must be a string",
  }),
  hyperdrive_rating: Joi.number().default(2.0).messages({
    "number.base": "The hyperdrive rating of the starship must be a number",
  }),
  MGLT: Joi.number().default(5).messages({
    "number.base": "The MGLT of the starship must be a number",
  }),
  starship_class: Joi.string().messages({
    "string.base": "The starship class must be a string",
  }),
}).options({ abortEarly: false });

export const queryDTO = Joi.object({
  name: Joi.string().trim().max(40).messages({
    "string.base": "The name of the starship must be a string",
    "string.max": "The name cannot be more than 40 characters",
  }),
  model: Joi.string().messages({
    "string.base": "The model of the starship must be a string",
  }),
  manufacturer: Joi.string().messages({
    "string.base": "The manufacturer of the starship must be a string",
  }),
  cost_in_credits: Joi.string().messages({
    "string.base": "The cost in credits of the starship must be a string",
  }),
  length: Joi.string().messages({
    "string.base": "The length of the starship must be a string",
  }),
  max_atmosphering_speed: Joi.string().messages({
    "string.base": "The maximum atmosphering speed of the starship must be a string",
  }),
  crew: Joi.string().messages({
    "string.base": "The crew of the starship must be a string",
  }),
  passengers: Joi.string().messages({
    "string.base": "The number of passengers of the starship must be a string",
  }),
  cargo_capacity: Joi.string().messages({
    "string.base": "The cargo capacity of the starship must be a string",
  }),
  consumables: Joi.string().messages({
    "string.base": "The consumables of the starship must be a string",
  }),
  hyperdrive_rating: Joi.number().messages({
    "number.base": "The hyperdrive rating of the starship must be a number",
  }),
  MGLT: Joi.number().messages({
    "number.base": "The MGLT of the starship must be a number",
  }),
  starship_class: Joi.string().messages({
    "string.base": "The starship class must be a string",
  }),
}).options({ abortEarly: false });
