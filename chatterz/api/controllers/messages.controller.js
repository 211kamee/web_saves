import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import User from '../models/user.models.js';
import { getSocketID, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
	try {
		const message = req.body.message.trim();
		const senderID = req.user._id;

		const { _id: receiverID } = await User.findOne({
			username: req.params.username,
		}).select('_id');

		if (!message) {
			return res.status(500).json('Enter a message.');
		}

		let conversation = await Conversation.findOne({
			participants: { $all: [senderID, receiverID] },
		});

		if (!conversation) {
			conversation = new Conversation({
				participants: [senderID, receiverID],
			});
		}

		const newMessage = await Message.create({
			senderID,
			receiverID,
			message,
		});

		conversation.messages.unshift(newMessage._id);
		await conversation.save();

		const receiverSocketID = getSocketID(req.params.username);
		if (receiverSocketID) {
			io.to(receiverSocketID).emit('newMsg', newMessage);
		}

		res.status(200).json(newMessage);
	} catch (error) {
		res.status(500).json([error.message, error]);
	}
};

export const getMessage = async (req, res) => {
	try {
		const receiverUser = await User.findOne({
			username: req.params.username,
		}).select('_id');

		if (!receiverUser) return res.status(404).json(`User Not Found.`);

		const receiverID = receiverUser._id;

		const senderID = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderID, receiverID] },
		}).populate('messages');

		if (!conversation) {
			return res.status(200).json([]);
		}

		return res.status(200).json(conversation.messages);
	} catch (error) {
		res.status(500).json([error.message, error]);
	}
};
