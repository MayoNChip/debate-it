interface ServerToClientEvents {
	noArg: () => void;
	basicEmit: (a: number, b: string, c: Buffer) => void;
	withAck: (d: string, callback: (e: number) => void) => void;
	"user-connected": (userId: string) => void;
}

interface ClientToServerEvents {
	hello: () => void;
	join: (roomId: string) => void;
	"join-room": (roomId: string, userId: string) => void;
}

interface InterServerEvents {
	ping: () => void;
}

interface SocketData {
	name: string;
	age: number;
}

export {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData,
};
