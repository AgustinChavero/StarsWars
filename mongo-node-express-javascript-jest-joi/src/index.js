const app = require("./app.js");
const { connectDatabase } = require("./db.js");
const { syncData } = require("./sync-data.js");

async function startServer() {
  console.log("Starting the server...");
  await connectDatabase();
  await syncData(); //Esta opcion reseteará por completo y recalibrará toda la informacion de ambas APIS
  console.log("Server is ready and data has been synchronized.");
}

app.listen(3000, startServer);
