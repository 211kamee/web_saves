import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/hooks/useLogin";
import { useEffect, useState } from "react";

export default function Login() {
	const { login, loading } = useLogin();
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setIsButtonDisabled(true);
		await login(inputs);
	};

	useEffect(() => {
		setIsButtonDisabled(false);
	}, [inputs, setInputs]);

	return (
		<div className="min-h-[calc(100dvh_-_theme(spacing.16))] w-full h-5/6 flex justify-center items-center">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								type="text"
								placeholder="user123"
								required
								value={inputs.username}
								onChange={(e) =>
									setInputs({
										...inputs,
										username: e.target.value,
									})
								}
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input
								id="password"
								type="password"
								required
								value={inputs.password}
								onChange={(e) =>
									setInputs({
										...inputs,
										password: e.target.value,
									})
								}
							/>
						</div>
						<Button
							type="submit"
							className="w-full"
							disabled={isButtonDisabled || loading}
							onClick={handleSubmit}
						>
							Login
						</Button>
						{/* <Button variant="outline" className="w-full">
							Login with Google
						</Button> */}
						{/* <Link
							to="#"
							className="ml-auto inline-block text-sm underline"
						>
							Forgot your password?
						</Link> */}
					</div>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link to="/auth/signup" className="underline">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
