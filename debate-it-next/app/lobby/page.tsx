import { redirect } from "next/navigation";
import React from "react";
import RoomList from "./RoomList";

function Lobby() {
	return (
		<div>
			<div className="flex flex-row flex-wrap justify-center space-x-3">
				<RoomList />
			</div>
		</div>
	);
}

export default Lobby;
