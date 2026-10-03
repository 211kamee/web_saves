// components/chat/MessageList.tsx
import { useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
	_id: string;
	message: string;
	senderID: string;
}

interface MessageListProps {
	messages: Message[];
	currentUserID: string;
}

const MessageList = ({ messages, currentUserID }: MessageListProps) => {
	const lastMessageRef = useRef<HTMLDivElement>(null);

	return (
		<ScrollArea className="flex-1 p-4 bg-gray-200 dark:bg-gray-900 h-[calc(100dvh_-_11rem)] md:h-auto flex flex-col-reverse">
			{/* <div className=" justify-end "> */}
			{messages.map((message, index) => (
				<div
					key={message._id}
					ref={index === messages.length - 1 ? lastMessageRef : null}
					className={`flex mb-4 ${
						message.senderID === currentUserID
							? 'justify-end'
							: 'justify-start'
					}`}
				>
					<div
						style={{ overflowWrap: 'anywhere' }}
						className={`max-w-[90%] p-3 rounded-lg ${
							message.senderID === currentUserID
								? 'bg-white text-gray-700 dark:bg-gray-700 dark:text-white'
								: 'bg-gray-700 text-white dark:bg-white dark:text-gray-700'
						}`}
					>
						{message.message}
					</div>
				</div>
			))}
			{/* </div> */}
		</ScrollArea>
	);
};

export default MessageList;
