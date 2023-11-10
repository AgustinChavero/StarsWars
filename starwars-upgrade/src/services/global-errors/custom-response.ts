import { FastifyReply } from "fastify";

export const customResponse = (
  res: FastifyReply,
  statusCode: number,
  data: { error: boolean; data: object | object[] }
): void => {
  res.status(statusCode).send({
    error: false,
    data,
  });
};
