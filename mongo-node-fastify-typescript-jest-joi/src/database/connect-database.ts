import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

class Database {
  async connect(): Promise<void> {
    try {
      await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@${process.env.DB_CLUSTER_DIR}<${process.env.DB_CLUSTER_NAME}>?retryWrites=true&w=majority`
      );
      console.log(">>> DB connected");
    } catch (error) {
      console.error(error);
    }
  }
}

const connectDatabase = new Database();
export default connectDatabase;
