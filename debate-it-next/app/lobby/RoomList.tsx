"use client";

import { useRouter } from "next/navigation";
import React from "react";

const rooms = [
  {
    id: 1,
    title: "Room 1",
    description: "This is room 1",
  },
  {
    id: "2",
    title: "Room 2",
    description: "This is room 2",
  },
  {
    id: "3",
    title: "Room 3",
    description: "This is room 3",
  },
];

type Props = {
  enterRoom: (roomId: string) => void;
};

function RoomList() {
  const router = useRouter();
  const enterRoom = (roomId: string) => {
    router.push(`room/${roomId}`);
  };

  return (
    <>
      {rooms.map((room) => (
        <div
          className="bg-stone-100 text-stone-800 shadow-md rounded-md flex flex-col w-[200px] h-[400px]"
          key={room.id}
        >
          <h1 className="text-3xl font-medium">{room.title}</h1>
          <p className="text-base font-thin">{room.description}</p>
          <button onClick={() => enterRoom(room.id.toString())}>Join</button>
        </div>
      ))}
    </>
  );
}

export default RoomList;
