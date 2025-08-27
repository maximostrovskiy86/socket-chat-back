import express from "express";
import cors from 'cors';
import pino from 'pino-http';

const app = express();

app.use(
	pino({
		transport: {
			target: 'pino-pretty',
		},
	}),
);

app.use(express.json());
app.use(cors());

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
// app.use('/api/auth', authRouter);

// app.use(errorHandler);

export default app;