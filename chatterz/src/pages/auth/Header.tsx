import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";

export default function Header() {
	const navigate = useNavigate();
	const { user } = useAuthContext();

	if (user) {
		useEffect(() => {
			navigate("/user"); // Redirect to authentication page
		});
	}

	return (
		<>
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<div className="flex w-full items-center gap-4 text-2xl font-extrabold md:ml-auto md:gap-2 lg:gap-4">
					<Link to="/">ChatterZ</Link>
				</div>

				<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					<Link
						to="#"
						className="text-muted-foreground transition-colors hover:text-foreground"
					>
						About
					</Link>
					<Link
						to="#"
						className="text-muted-foreground transition-colors hover:text-foreground"
					>
						FAQs
					</Link>
					<Link
						to="#"
						className="text-muted-foreground transition-colors hover:text-foreground"
					>
						Contact us
					</Link>
					<ModeToggle />
				</nav>

				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="shrink-0 md:hidden"
						>
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="top">
						<SheetHeader>
							<VisuallyHidden.Root>
								<SheetTitle>Nav Content</SheetTitle>
							</VisuallyHidden.Root>
							<SheetDescription>{""}</SheetDescription>
						</SheetHeader>

						<nav className="grid gap-4 text-lg font-medium justify-center">
							<Link
								to="#"
								className="flex items-center gap-2 text-lg font-extrabold "
							>
								ChatterZ
							</Link>
							<Separator orientation="vertical" />
							<Link
								to="#"
								className="text-muted-foreground hover:text-foreground"
							>
								About
							</Link>
							<Link
								to="#"
								className="text-muted-foreground hover:text-foreground"
							>
								FAQs
							</Link>
							<Link
								to="#"
								className="text-muted-foreground hover:text-foreground"
							>
								Contacts
							</Link>
							<ModeToggle />
						</nav>
					</SheetContent>
				</Sheet>
			</header>
			<Outlet />
		</>
	);
}
