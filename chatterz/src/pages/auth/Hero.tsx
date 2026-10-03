import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Main() {
	return (
		<>
			<main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-10">
				<p>Backend Server is Down, Service is not maintained !!!</p>
				<Button asChild className="w-full md:w-36">
					<Link to="/auth/login">Login!</Link>
				</Button>
				<Button asChild className="w-full md:w-36">
					<Link to="/auth/signup">Sign Up?</Link>
				</Button>
			</main>
		</>
	);
}
