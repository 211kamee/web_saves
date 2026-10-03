// components/chat/ContactCard.tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ContactCardProps {
	username?: string;
	avatarUrl?: string;
	onClick?: () => void;
}

const ContactCard = ({
	username = "User",
	avatarUrl = "",
	onClick = () => {},
}: ContactCardProps) => {
	return (
		<div
			onClick={onClick}
			className="flex items-center p-4 space-x-4 border cursor-pointer transition-colors hover:bg-gray-200 dark:hover:bg-gray-900"
		>
			<div className="relative">
				<Avatar>
					<AvatarImage src={avatarUrl} alt={username} />
					<AvatarFallback>
						{username
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</AvatarFallback>
				</Avatar>
			</div>

			<div className="flex-1 min-w-0">
				<div className="flex items-center justify-between">
					<h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
						{username}
					</h3>
				</div>
			</div>
		</div>
	);
};

export default ContactCard;
