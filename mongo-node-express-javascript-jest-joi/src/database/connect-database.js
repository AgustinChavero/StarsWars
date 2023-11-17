require("dotenv").config();
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@${process.env.DB_CLUSTER_DIR}<${process.env.DB_CLUSTER_NAME}>?retryWrites=true&w=majority`
    );

    console.log(">>> DB connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDatabase };
