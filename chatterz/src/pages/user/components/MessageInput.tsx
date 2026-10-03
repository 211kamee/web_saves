// components/chat/MessageInput.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface MessageInputProps {
	message: string;
	setMessage: (message: string) => void;
	onSend: () => void;
	loading: boolean;
}

const MessageInput = ({
	message,
	setMessage,
	onSend,
	loading,
}: MessageInputProps) => {
	return (
		<div className="sticky bottom-0 w-full p-2 bg-white dark:bg-gray-800 border-t">
			<div className="flex space-x-2">
				<Input
					placeholder="Type a message..."
					className="flex-1 bg-gray-200 dark:bg-gray-900"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !loading && message.trim()) {
							onSend();
						}
					}}
				/>
				<Button
					size="icon"
					disabled={loading || !message.trim()}
					onClick={onSend}
				>
					<Send className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

export default MessageInput;
