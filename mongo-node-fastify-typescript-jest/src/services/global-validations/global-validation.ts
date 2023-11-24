import { Schema } from "joi";
import { FastifyRequest } from "fastify";

export function bodyValidation(dto: Schema, req: FastifyRequest): string | void {
  const { error, value } = dto.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(" ");
    return errorMessage;
  }

  req.body = value;
}

export function paramsValidation(dto: Schema, req: FastifyRequest): string[] | null {
  const { error } = dto.validate(req.params);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return errorMessages;
  }

  return null;
}

export function queryValidation(dto: Schema, req: FastifyRequest): string[] | null {
  const { error } = dto.validate(req.query);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return errorMessages;
  }

  return null;
}
