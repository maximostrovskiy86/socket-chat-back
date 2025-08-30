import express from "express";
import cors from 'cors';
import pino from 'pino-http';
import logger from 'morgan';


const app = express();

// app.use(
// 	pino({
// 		transport: {
// 			target: 'pino-pretty',
// 		},
// 	}),
// );

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);

// app.use(logger('dev'));



// app.use('*', (req, res, next) => {
// 	res.status(404).json({
// 		message: 'Not found',
// 	});
// });
//
// app.use((err, req, res, next) => {
// 	res.status(500).json({
// 		message: 'Something went wrong',
// 		error: err.message,
// 	});
// });

// app.use(logger('dev'));

// app.use('/api/tasks', taskRouter);

// app.use(errorHandler);

export default app;