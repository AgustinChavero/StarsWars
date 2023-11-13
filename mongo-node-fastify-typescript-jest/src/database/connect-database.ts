import mongoose from "mongoose";

class Database {
  async connect(): Promise<void> {
    try {
      await mongoose.connect(
        "mongodb+srv://agustindanielchavero:fLxFjieDCiCs6DBP@cluster0.ysao6ts.mongodb.net/<Cluster0>?retryWrites=true&w=majority"
      );
      console.log(">>> DB connected");
    } catch (error) {
      console.error(error);
    }
  }
}

const connectDatabase = new Database();
export default connectDatabase;