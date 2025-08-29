import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import app from "../app.js";
import {connectMongo} from "../db/connection.js";

const server = createServer(app);
export const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

dotenv.config({ debug: true });

const PORT = process.env.PORT || 10000;
// const PORT = 4000;

// const io = new Server(server);


// app.get('/', (req, res) => {
// 	// console.log("reqasassa", req.body)
// 	res.json({
// 		message: 'Hello world! 789',
// 	});
// });


const start = async () => {
	try {
		await connectMongo();
		
		app.listen(PORT, (err) => {
			if (err) console.error('Error at server.js launch:', err);
			console.log(`Server works at port !!!!!!!!!!!${PORT}!`);
		});
		
		io.on('connection', (socket) => {
			console.log('a user connected');
			console.log('socket', socket);
			console.log('socket.id', socket.id);
			
			socket.on("CHAT_MESSAGE", async (message) => {
				console.log("Message", message)
				io.emit("CHAT_MESSAGE", message);
			})
		});
	} catch (err) {
		console.error(`Failed to launch application with error: ${err.message}`);
	}
};

start();
