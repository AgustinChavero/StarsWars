import fastify, { FastifyInstance } from "fastify";
import connectDatabase from "./src/database/connect-database";
import { syncData } from "./src/database/sync-data";
import { errorHandler } from "./src/utils/global-errors/custom-error";

import starshipRoutes from "./src/modules/starship-route";

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

  app.listen(3003, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Info listening on ${address}`);
  });
});
