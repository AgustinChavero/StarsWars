import { FastifyReply } from "fastify";

export const customError = (
  res: FastifyReply,
  statusCode: number | undefined,
  message: string
) => {
  res.status(statusCode || 500).send({
    error: true,
    message,
  });
};
