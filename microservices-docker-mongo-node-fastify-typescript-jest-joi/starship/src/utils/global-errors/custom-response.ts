import { FastifyReply } from "fastify";

export const customResponse = (
  res: FastifyReply,
  statusCode: number,
  data: object | any
) => {
  res.status(statusCode).send({
    error: false,
    data,
  });
};
