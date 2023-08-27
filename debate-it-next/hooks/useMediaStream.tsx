import React, { useRef, useState } from "react";

function useMediaStream(mediaStream: React.RefObject<HTMLVideoElement>) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [muted, setMuted] = useState(false);
  const [videoOn, SetVideoOn] = useState(false);

  const startStream = async () => {
    const newStream = await navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        if (mediaStream.current) {
          mediaStream.current.srcObject = stream;
        }
        // mediaStream.current.srcObject = stream;
        setStream(stream);
      });
    setIsPlaying(true);
  };
  const stopStream = () => {
    stream?.getTracks().forEach((track) => track.stop());

    setIsPlaying(false);
  };
  const toggleVideo = () => {
    stream
      ?.getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    SetVideoOn(!videoOn);
  };

  const toggleAudio = () => {
    stream
      ?.getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setMuted(!muted);
  };

  return {
    startStream,
    stopStream,
    isPlaying,
    stream,
    toggleAudio,
    toggleVideo,
    muted,
    videoOn,
  };
}

export default useMediaStream;
