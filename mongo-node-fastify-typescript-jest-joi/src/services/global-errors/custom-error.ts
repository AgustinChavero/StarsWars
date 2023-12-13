import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const errorResponse = (
  reply: FastifyReply,
  statusCode: number,
  message: string
): void => {
  reply.code(statusCode).send({
    error: true,
    message: message,
  });
};

export const errorHandler = (
  err: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply
): void => {
  const { statusCode, message } = err;
  errorResponse(reply, statusCode || 500, message || "Internal Server Error");
};
