import { config } from 'dotenv';
config();
import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
const app = express();
const server = http.createServer(app);
const origin = process.env.ORIGIN ? JSON.parse(process.env.ORIGIN) : [];
const io = new Server(server, {
	cors: {
		origin: origin,
		credentials: true,
	},
});

const userSocketMap = {};

io.on('connection', (socket) => {
	const connectedUser = socket.handshake.query.userId;
	if (connectedUser) userSocketMap[connectedUser] = socket.id;

	io.emit('onlineUsers', Object.keys(userSocketMap));

	socket.on('disconnect', () => {
		console.log('Disconnected : ' + socket.id);
		delete userSocketMap[connectedUser];
		io.emit('onlineUsers', Object.keys(userSocketMap));
	});
});

export function getSocketID(username) {
	return userSocketMap[username];
}

export { app, io, server };
