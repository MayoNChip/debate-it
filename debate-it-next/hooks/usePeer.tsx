import { useState } from "react";
import Peer from "peerjs";

function usePeer(peerId: string) {
  const [peer, setPeer] = useState<Peer | null>(null);

  const openPeer = () => {
    const newPeer = new Peer(peerId, {
      host: "localhost:9000/myapp",
      secure: false,
    });
    setPeer(newPeer);
  };

  return { peer };
}

export default usePeer;
