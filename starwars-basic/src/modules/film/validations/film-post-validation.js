const Joi = require("joi");

const filmPostSchema = Joi.object({
  title: Joi.string().required().trim().max(40).messages({
    "string.base": "The title must be a string of characters",
    "string.empty": "The title cannot be empty",
    "string.required": "The title is required",
    "string.max": "The title cannot be more than 40 characters",
  }),
  episode_id: Joi.number().min(1).default(1.0).messages({
    "number.base": "The episode must be a number",
    "number.min": "The episode must be greater than or equal to 1",
  }),
  opening_crawl: Joi.string().trim().max(1000).allow("").messages({
    "string.base": "The opening crawl must be a string of characters",
    "string.max": "The opening crawl cannot be more than 1000 characters",
  }),
  director: Joi.string().trim().max(30).allow("").messages({
    "string.base": "The director must be a string of characters",
    "string.max": "The director cannot be more than 30 characters",
  }),
  producer: Joi.string().trim().max(30).allow("").messages({
    "string.base": "The producer must be a character string",
    "string.max": "The producer cannot be more than 30 characters",
  }),
  release_date: Joi.string().trim().max(20).allow("").messages({
    "string.base": "The release date must be a string of characters.",
    "string.max": "The release date cannot be more than 20 characters.",
  }),
}).options({ abortEarly: false });

function validatePostFilm(req, res, next) {
  const { error, value } = filmPostSchema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(" ");
    return res.status(400).json({ error: errorMessage });
  }

  req.body = value;
  next();
}

module.exports = { validatePostFilm };
