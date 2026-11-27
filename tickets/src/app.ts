import express, { urlencoded } from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { createTicketRouter } from "./routes/new";

import { errorHandler, NotFoundError, currentUser } from "@mh01tickets/common";
import cookieSession from "cookie-session";
const app = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  }),
);
app.use(urlencoded({ extended: true }));

app.use(currentUser);

app.use(createTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
