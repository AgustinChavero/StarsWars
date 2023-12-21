import Joi from "joi";

export const paramsSchema = Joi.object({
  id: Joi.string().length(24).required().messages({
    "string.base": "The ID must be a string",
    "string.length": "The ID must be exactly 24 characters long",
    "string.required": "An ID is required",
  }),
}).options({ abortEarly: false });
