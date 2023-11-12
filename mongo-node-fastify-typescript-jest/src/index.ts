import fastify, { FastifyInstance } from "fastify";
import connectDatabase from "./database/connect-database";
import { errorHandler } from "./services/global-errors/custom-error";

import filmRoute from "./modules/film/film-route";

const app: FastifyInstance = fastify({ logger: true });
export default app;

app.register(filmRoute);
connectDatabase.connect();

interface IQueryInterface {
  username: string;
  password: string;
}

interface IHearders {
  "x-access-token": string;
}

interface IReply {
  code: number;
  message: string;
  body: any;
}

app.get<{ Querystring: IQueryInterface; Headers: IHearders; Reply: IReply }>(
  "/",
  async (request, reply) => {
    const { username, password } = request.query;
    return reply.send({
      code: 200,
      message: "success",
      body: {
        error: false,
        data: {},
      },
    });
  }
);

app.setErrorHandler(errorHandler);

app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Info listening on ${address}`);
});
