import { useAuthContext } from "./AuthContext";
import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface SocketContextType {
	msg: any[];
	setMsg: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SocketContext = createContext<SocketContextType>({
	msg: [],
	setMsg: () => {},
});

export const SocketContextProvider = ({ children }: { children: any }) => {
	const { user, API_URL } = useAuthContext();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [msg, setMsg] = useState<any[]>([]);
	// const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

	useEffect(() => {
		if (socket) {
			console.log("Closing existing socket...");
			socket.disconnect();
		}
		setSocket(null);
		if (user?.username) {
			const connectionSocket = io(`${API_URL}`, {
				query: { userId: user.username },
			});
			setSocket(connectionSocket);
			connectionSocket.on("connect", () => {
				console.log("Socket connected with ID:", connectionSocket.id);
				console.log("Socket connected:", connectionSocket.connected);
			});

			connectionSocket.on("newMsg", (res) => {
				setMsg((prevState) => {
					const newVal = [...prevState, res];
					return newVal;
				});
			});

			connectionSocket.on("onlineUsers", (users: any) => {
				console.log("Received online users:", users);
				// setOnlineUsers(users);
			});

			connectionSocket.on("disconnect", (reason) => {
				console.log("Socket disconnected. Reason:", reason);
				setSocket(null);
			});

			return () => {
				console.log("Disconnecting socket...");
				connectionSocket.disconnect();
				setSocket(null);
			};
		}
	}, [user, setSocket, setMsg]);

	return (
		<SocketContext.Provider value={{ msg, setMsg }}>
			{children}
		</SocketContext.Provider>
	);
};

export const useSocketContext = () => useContext(SocketContext);
