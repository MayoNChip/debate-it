import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Server } from "Socket.IO";

export async function GET() {
  const newId = uuidv4();
  // redirect to new socketIO connection

  redirect(`socket/socket?id=${newId}`);
}
