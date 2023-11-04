const app = require("./app.js");
const { connectDatabase } = require("./db.js");

app.listen(3000, async () => {
  console.log("Server listening on port", 3000);
  await connectDatabase();
});
