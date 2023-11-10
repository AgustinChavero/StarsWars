import mongoose from "mongoose";

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(
      // Para hacer mas facil la ejecucion del proyecto dejo las credenciales aqui hasta nuevo aviso
      "mongodb+srv://agustindanielchavero:fLxFjieDCiCs6DBP@cluster0.ysao6ts.mongodb.net/<Cluster0>?retryWrites=true&w=majority"
    );

    console.log(">>> DB connected");
  } catch (error) {
    console.error(error);
  }
};

export { connectDatabase };
