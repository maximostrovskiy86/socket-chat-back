import app from "../app.js";
// import {connectMongo} from "../db/connection.js";
import dotenv from 'dotenv';

dotenv.config({ debug: true });

const PORT = process.env.PORT || 10000;



const start = async () => {
	try {
		// await connectMongo();
		
		app.get('/', (req, res) => {
			// console.log("reqasassa", req.body)
			res.json({
				message: 'Hello world! 789',
			});
		});
		
		app.listen(PORT, (err) => {
			if (err) console.error('Error at server.js launch:', err);
			console.log(`Server works at port !!!!!!!!!!!${PORT}!`);
		});
	} catch (err) {
		console.error(`Failed to launch application with error: ${err.message}`);
	}
};

start();
