"use client";

import useMediaStream from "@/hooks/useMediaStream";
import MediaStream from "@/hooks/useMediaStream";
import { socket } from "@/utils/socket";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Room() {
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [fooEvents, setFooEvents] = useState<string[]>([]);
	const { roomId } = useParams();
	console.log(roomId, "roomId");
	const [isLobby, setIsLobby] = useState(true);
	const mediaStream = useRef<HTMLVideoElement>(null);
	const {
		stream,
		startStream,
		stopStream,
		isPlaying,
		toggleAudio,
		toggleVideo,
		videoOn,
		muted,
	} = useMediaStream(mediaStream);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onFooEvent(value: string) {
			setFooEvents((previous) => [...previous, value]);
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("foo", onFooEvent);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("foo", onFooEvent);
		};
	}, []);

	function connectSocket() {
		socket.connect();
		socket.emit("join-room", roomId, "1234");
		socket.on("user-connected", (userId) => {
			console.log("userID", userId);
		});
		startStream();
	}

	// return isLobby
	//   ? <Lobby stream={stream} onJoinRoom={() => setIsLobby(false)} />
	//   : <Room stream={stream} />;

	!mediaStream && console.log("mediaStream is null");
	return (
		<div>
			<video ref={mediaStream} autoPlay muted={muted}></video>

			<h1>{muted && "Muted"}</h1>
			<button onClick={isPlaying ? stopStream : connectSocket}>
				{isConnected ? "Leave" : "Join"}
			</button>
			<button onClick={toggleAudio}>Toggle Audio</button>
			<button onClick={toggleVideo}>Toggle Video</button>
		</div>
	);
}
