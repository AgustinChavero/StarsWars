const HOST: string = "RENDER" in process.env ? "0.0.0.0" : "localhost";
const PORT: number = parseInt(process.env.PORT || "3000", 10);

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

  app.listen({ host: HOST, port: PORT }, (err) => {
    if (err) throw err;
    console.log(`Server listening on ${HOST}:${PORT}`);
  });
});
