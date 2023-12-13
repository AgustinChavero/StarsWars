import Joi from "joi";

export const bodyDTO = Joi.object({
  title: Joi.string().required().trim().max(40).messages({
    "string.base": "The title must be a string",
    "string.empty": "The title cannot be empty",
    "string.required": "The title is required",
    "string.max": "The title cannot be more than 40",
  }),
  episode_id: Joi.number().min(1).default(1.0).messages({
    "number.base": "The episode must be a number",
    "number.min": "The episode must be greater than or equal to 1",
  }),
  opening_crawl: Joi.string().trim().max(1000).allow("").messages({
    "string.base": "The opening crawl must be a string",
    "string.max": "The opening crawl cannot be more than 1000",
  }),
  director: Joi.string().trim().max(30).allow("").messages({
    "string.base": "The director must be a string",
    "string.max": "The director cannot be more than 30",
  }),
  producer: Joi.string().trim().max(30).allow("").messages({
    "string.base": "The producer must be a character string",
    "string.max": "The producer cannot be more than 30",
  }),
  release_date: Joi.string().trim().max(20).allow("").messages({
    "string.base": "The release date must be a string.",
    "string.max": "The release date cannot be more than 20.",
  }),
}).options({ abortEarly: false });

export const queryDTO = Joi.object({
  title: Joi.string().trim().max(40).messages({
    "string.base": "The title must be a string",
    "string.max": "The title cannot be more than 40",
  }),
  episode_id: Joi.number().min(1).default(1.0).messages({
    "number.base": "The episode must be a number",
    "number.min": "The episode must be greater than or equal to 1",
  }),
  opening_crawl: Joi.string().trim().max(1000).allow("").messages({
    "string.base": "The opening crawl must be a string",
    "string.max": "The opening crawl cannot be more than 1000",
  }),
  director: Joi.string().trim().max(30).allow("").messages({
    "string.base": "The director must be a string",
    "string.max": "The director cannot be more than 30",
  }),
  producer: Joi.string().trim().max(30).allow("").messages({
    "string.base": "The producer must be a character string",
    "string.max": "The producer cannot be more than 30",
  }),
  release_date: Joi.string().trim().max(20).allow("").messages({
    "string.base": "The release date must be a string",
    "string.max": "The release date cannot be more than 20",
  }),
}).options({ abortEarly: false });
