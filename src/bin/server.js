import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "node:http";
import app from "../app.js";
import { connectMongo } from "../db/connection.js";
import {
  getMessagesController,
  createMessageController,
} from "../controllers/messageController.js";
import {
  getAllUsersController,
  getOnlineUsers,
  getUserByIdAndUpdate,
} from "../controllers/userController.js";
import { decodeJwt } from "../helpers/decodeJwt.js";

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

dotenv.config();
const PORT = process.env.PORT || 10000;

const start = async () => {
  try {
    await connectMongo();

    httpServer.listen(PORT, (err) => {
      if (err) console.error("Error at server.js launch:", err);
      console.log(`Server works at port !!!${PORT}!`);
    });

    io.use(async (socket, next) => {
      const verifyToken = socket.handshake.auth.token;

      if (!verifyToken) {
        socket.disconnect();
      }

      const user = await decodeJwt(verifyToken);

      // get user from db by id and test for ban status
      if (!user || user.isBanned) {
        socket.disconnect(true);
        return;
      }

      const sockets = await io.fetchSockets();
      const exists = sockets.find((s) => s.user.id === user.id);

      if (exists) {
        exists.disconnect();
      }
	  
	  socket.user = user;
      next();
    });

    io.on("connection", async (socket) => {
      // console.log("a user connected");
      await createMessageController(io, socket);
      await getMessagesController(socket);

      const sockets = await io.fetchSockets();
      const usersOnline = sockets.map((elem) => elem?.user);

      const allUsers = await getAllUsersController(io, usersOnline);
      sockets.map((socket) => {
        if (socket.user.isAdmin) {
          socket.emit("GET_ALL_USERS", allUsers);
        }
      });
      await getOnlineUsers(io, usersOnline);

      socket.on("ON_MUTE", async ({ id, isMuted }) => {
        const user = await getUserByIdAndUpdate(id, { isMuted: !isMuted });

        const s = await io.fetchSockets();
        const uOn = s.map((elem) => elem.user);

        socket.emit("GET_ALL_USERS", await getAllUsersController(io, uOn));

        const sock = await io.fetchSockets();

        const exists = sock.find((s) => s.user.id === id);
        if (exists) {
          console.log("USER_UPDATE", user);
          exists.emit("USER_UPDATE", user);
        }
      });

      socket.on("BAN_USER", async ({ id, isBanned }) => {
        const sock = await io.fetchSockets();
        const exists = sock.find((s) => s.user.id === id);

        if (exists) {
          exists.disconnect();
        }

        await getUserByIdAndUpdate(id, { isBanned: !isBanned });
        try {
          const users = await getAllUsersController(io, usersOnline);
          socket.emit("GET_ALL_USERS", users);
        } catch (e) {
          socket.emit("GET_ALL_USERS_ERROR", e.message);
        }
      });

      socket.on("disconnect", async () => {
        const socks = await io.fetchSockets();
        const uOnline = socks.map(
          (elem) =>
            // console.log("elem.user", elem.user);
            elem.user,
        );

        // send all list for admins
        io.emit("GET_ALL_USERS", await getAllUsersController(io, uOnline));
        // update users online after disconnect
        io.emit(
          "GET_ONLINE_USERS",
          socks.map((s) => s.user),
        );
      });
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
};

start();
