import fastify from "fastify";
import { connectDatabase } from "./database/db";

const app = fastify();

async function startServer() {
  console.log("Starting the server...");
  await connectDatabase();
  // await syncData(); // Esta opción reseteará por completo y recalibrará toda la información de ambas APIS
  console.log("Server is ready and data has been synchronized.");
}

app.listen(3000, startServer);
