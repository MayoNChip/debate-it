import { io } from "socket.io-client";

const socketServer = process.env.SOCKET_IO_SERVER;

export const socket = io("localhost:8000", {
	autoConnect: false,
});
