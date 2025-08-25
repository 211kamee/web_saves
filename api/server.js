import { config } from 'dotenv';
config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import conversationsRoutes from './routes/conversations.routes.js';

import { app, server } from './socket/socket.js';

app.use(
	cors({
		origin: process.env.ORIGIN ? JSON.parse(process.env.ORIGIN) : [],
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationsRoutes);

app.get('/', (req, res) => {
	res.json('Chatterz API Live');
});

server.listen(process.env.PORT || 3000, async () => {
	try {
		await mongoose.connect(`${process.env.MONGO_URI}`);
		console.log(`DB Connected!`);
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
	}
	console.log(`PORT : ${process.env.PORT || 3000}`);
});
