// components/chat/ConversationList.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import ContactCard from "./ContactCard";

interface User {
	_id: string;
	username: string;
	avatarUrl?: string;
}

interface ConversationListProps {
	conversations: User[];
	onSelect: (user: User) => void;
}

const ConversationList = ({
	conversations,
	onSelect,
}: ConversationListProps) => {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredConversations = conversations.filter((people) =>
		people.username.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<>
			<div className="p-2">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
					<Input
						placeholder="Search conversations..."
						className="pl-9 dark:bg-gray-900 border-b"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			<ScrollArea className="flex-1 divide-y divide-gray-200 dark:divide-gray-700">
				{filteredConversations.length > 0 ? (
					filteredConversations.map((people) => (
						<ContactCard
							key={people._id}
							username={`@${people.username}`}
							avatarUrl={people.avatarUrl}
							onClick={() => onSelect(people)}
						/>
					))
				) : (
					<div className="p-4 text-center text-gray-500 dark:text-gray-400">
						No conversations found
					</div>
				)}
			</ScrollArea>
		</>
	);
};

export default ConversationList;
