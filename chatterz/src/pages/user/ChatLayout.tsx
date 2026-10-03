// pages/ChatLayout.tsx
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext.tsx';
import { useSocketContext } from '@/context/SocketContext.tsx';

import ConversationList from './components/ConversationList.tsx';
import MessageList from './components/MessageList.tsx';
import MessageInput from './components/MessageInput.tsx';

interface User {
	_id: string;
	username: string;
	avatarUrl?: string;
}

interface Message {
	_id: string;
	message: string;
	senderID: string;
}

const ChatLayout = () => {
	const { user, setUser, API_URL } = useAuthContext();
	const { msg, setMsg } = useSocketContext();
	const [selectedChat, setSelectedChat] = useState<User | null>(null);
	const [isMobileListVisible, setIsMobileListVisible] = useState(true);
	const [conversations, setConversations] = useState<User[]>([]);
	const [messages, setMessages] = useState<Message[]>([]);
	const [sendMsg, setSendMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchConversations = async () => {
			try {
				const res = await axios.get(
					API_URL + '/api/conversations/people',
					{
						withCredentials: true,
					}
				);
				setConversations(res.data);
				console.log(conversations);
			} catch (error: any) {
				console.log([error.message, error]);
				toast.error(error.response?.data || 'Something went wrong!');
				setUser(null);
				localStorage.clear();
				navigate('/auth');
			}
		};
		fetchConversations();
	}, []);

	const msgLoader = async (people: User) => {
		try {
			const res = await axios.get(
				API_URL + '/api/messages/' + people.username,
				{
					withCredentials: true,
				}
			);
			setMsg([]);
			setMessages(res.data);
		} catch (error: any) {
			console.log([error.message, error]);
			toast.error(error.response?.data || 'Something went wrong!');
		}
	};

	const handleChatSelect = (people: User) => {
		setSelectedChat(people);
		msgLoader(people);
		setIsMobileListVisible(false);
	};

	const handleBack = () => {
		setIsMobileListVisible(true);
		setSelectedChat(null);
	};

	const handleSendMsg = async () => {
		if (!sendMsg.trim() || !selectedChat) return;

		setLoading(true);
		try {
			await axios.post(
				API_URL + '/api/messages/' + selectedChat.username,
				{ message: sendMsg.trim() },
				{ withCredentials: true }
			);
			setSendMsg('');

			await msgLoader(selectedChat);
		} catch (error: any) {
			console.log([error.message, error]);
		}
		setLoading(false);
	};

	return (
		<div className="flex h-[calc(100dvh_-_theme(spacing.16))] bg-gray-100 dark:bg-gray-900 relative">
			{/* Conversation List Panel */}
			<div
				className={`w-full md:w-80 md:flex-shrink-0 bg-white dark:bg-gray-800 border-r flex-col ${
					isMobileListVisible ? 'flex' : 'hidden md:flex'
				}`}
			>
				<ConversationList
					conversations={conversations}
					onSelect={handleChatSelect}
				/>
			</div>

			{/* Chat Panel */}
			<div
				className={`h-full flex-1 flex flex-col ${
					isMobileListVisible ? 'hidden' : 'flex'
				}`}
			>
				{selectedChat ? (
					<>
						{/* Chat Header */}
						<div className="sticky top-15 p-2 border-b bg-white dark:bg-gray-800 flex items-center">
							<Button
								variant="ghost"
								size="icon"
								className="mr-2"
								onClick={handleBack}
							>
								<ArrowLeft className="h-5 w-5" />
							</Button>
							<div className="flex-1">
								<h2 className="font-semibold dark:text-white">
									{`@${selectedChat.username}`}
								</h2>
							</div>
						</div>

						<MessageList
							// messages={messages}
							messages={[...msg, ...messages]}
							currentUserID={user._id}
						/>

						<MessageInput
							message={sendMsg}
							setMessage={setSendMsg}
							onSend={handleSendMsg}
							loading={loading}
						/>
					</>
				) : (
					<div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
						<p className="text-gray-500 dark:text-gray-400">
							Select a conversation to start messaging
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatLayout;
