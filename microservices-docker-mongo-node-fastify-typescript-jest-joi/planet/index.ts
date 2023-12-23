const host = "0.0.0.0";
import fastify, { FastifyInstance } from "fastify";
import connectDatabase from "./src/database/connect-database";
import { syncData } from "./src/database/sync-data";
import { errorHandler } from "./src/utils/global-errors/custom-error";

import planetRoutes from "./src/modules/planet-route";

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
  app.register(planetRoutes);

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

  app.listen(
    { host, port: process.env.PORT || 3000 } as { host: string; port: number },
    (err) => {
      if (err) throw err;
    }
  );
});
