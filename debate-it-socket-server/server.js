"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
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
    const newRoomId = (0, uuid_1.v4)();
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
