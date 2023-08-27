"use client";

import useMediaStream from "@/hooks/useMediaStream";
import MediaStream from "@/hooks/useMediaStream";
import { NextPage } from "next";
import { useRef, useState } from "react";

export default function Room() {
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

  // return isLobby
  //   ? <Lobby stream={stream} onJoinRoom={() => setIsLobby(false)} />
  //   : <Room stream={stream} />;

  !mediaStream && console.log("mediaStream is null");
  return (
    <div>
      <video ref={mediaStream} autoPlay muted={muted}></video>

      <h1>{muted && "Muted"}</h1>
      <button onClick={isPlaying ? stopStream : startStream}>
        {isPlaying ? "Stop" : "Start"}
      </button>
      <button onClick={toggleAudio}>Toggle Audio</button>
      <button onClick={toggleVideo}>Toggle Video</button>
    </div>
  );
}
