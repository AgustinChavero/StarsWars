import fastify from "fastify";
import morgan from "morgan";
import fastifyAccepts from "@fastify/accepts";

import routerApi from "./modules/index-routes";
import { customError } from "./services/global-errors/custom-error";

const app = fastify({ logger: true });

app.addHook("preHandler", (request, reply, done) => {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  reply.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Content-Length"
  );
  reply.header("Access-Control-Allow-Credentials", "true");
  done();
});

app.addHook("onRequest", (request, reply, done) => {
  morgan("dev")(request.raw, reply.raw, done);
});
app.register(fastifyAccepts);

app.register(routerApi, { prefix: "/" });

app.setErrorHandler((error, request, reply) => {
  const { statusCode, message } = error;
  customError(reply, statusCode, message);
});

export default app;
