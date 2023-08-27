import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { v4 as uuidV4 } from "uuid";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
} from "./socketio";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors());

const httpServer = createServer(app);
const io = new Server<
	ClientToServerEvents,
	ServerToClientEvents,
	InterServerEvents,
	SocketData
>(httpServer, {
	cors: {
		origin: "*",
	},
});

app.get("/", (req, res) => {
	console.log("Working");
	// res.json({ message:
	// 	'Hello 1111 FOR asdf Folks from the Express server!' });
	res.status(200).send({ hello: "world" });
});

app.get("/getRoom", (req, res) => {
	const newRoomId = uuidV4();
	console.log("new room", newRoomId);
	// res.json({ message:
	// 	'Hello 1111 FOR asdf Folks from the Express server!' });
	res.json(newRoomId);
});

io.on("connection", (socket) => {
	console.log("connected");

	socket.on("join-room", (roomId, userId) => {
		console.log(userId, "joined room", roomId);
		socket.join(roomId);
		socket.broadcast.to(roomId).emit("user-connected", userId);
	});

	// socket.on("message", (data) => {
	// 	io.in(data.room).emit("new message", {
	// 		user: data.user,
	// 		message: data.message,
	// 	});
	// });
});

httpServer.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
