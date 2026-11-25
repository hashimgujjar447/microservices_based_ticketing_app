import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017");
    console.log("Connected to mongodb");

    app.listen(3000, () => {
      console.log("App is listening at port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
