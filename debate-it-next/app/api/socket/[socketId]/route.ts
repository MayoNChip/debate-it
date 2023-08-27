import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { Server } from "socket.io";

export async function GET(req: NextRequest) {
  const socketId = req.nextUrl.searchParams.get("id");

  const io = new Server();

  io.on("connection", (socket) => {});
  return new Response(socketId);
}
