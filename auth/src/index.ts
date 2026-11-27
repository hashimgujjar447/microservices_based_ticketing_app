import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MongoDB url is not defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongodb");

    app.listen(3000, () => {
      console.log("App is listening at port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
