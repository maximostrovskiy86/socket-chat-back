import express from "express";
import cors from "cors";
import logger from "morgan";
import authRouter from "./routes/authRouter.js";
// import {notFoundHandler} from "./middlewares/notFoundHandler.js";
import {errorHandler} from "./middlewares/errorHandler.js";


const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);

// app.use('/{*any}', notFoundHandler);
app.use(errorHandler);

export default app;
