const app = require("./app.js");
const { connectDatabase } = require("./db.js");
const { syncData } = require("./sync-data.js");

async function startServer() {
  console.log("Starting the server...");
  await connectDatabase();
  await syncData();
  console.log("Server is ready and data has been synchronized.");
}

app.listen(3000, startServer);
