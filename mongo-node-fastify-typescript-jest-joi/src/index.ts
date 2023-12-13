import fastify, { FastifyInstance } from "fastify";
import connectDatabase from "./database/connect-database";
import { syncData } from "./database/sync-data";
import { errorHandler } from "./services/global-errors/custom-error";

import filmRoute from "./modules/film/film-route";
import peopleRoutes from "./modules/people/people-route";
import planetRoutes from "./modules/planet/planet-route";
import starshipRoutes from "./modules/starship/starship-route";

const app: FastifyInstance = fastify({ logger: true });
export default app;

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

syncData().then(() => {
  app.register(filmRoute);
  app.register(peopleRoutes);
  app.register(planetRoutes);
  app.register(starshipRoutes);

  app.get<{ Querystring: IQueryInterface; Headers: IHearders; Reply: IReply }>(
    "/",
    async (request, reply) => {
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
});
