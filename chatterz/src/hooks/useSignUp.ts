import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function useSignUp() {
	const navigate = useNavigate();
	const { API_URL, setUser } = useAuthContext();
	const [loading, setLoading] = useState(false);

	const signup = async ({
		username = "",
		email = "",
		password = "",
		confirmPassword = "",
	}) => {
		if (!handleInputError({ username, email, password, confirmPassword })) {
			return false;
		}

		setLoading(true);

		try {
			const res = await axios.post(
				API_URL + "/api/auth/signup",
				{ username, email, password, confirmPassword },
				{ withCredentials: true }
			);

			toast.success("Account created successfully!");
			setUser(res.data.user);
			localStorage.setItem("user", JSON.stringify(res.data.user));
			navigate(`/user/convo`);
			return true;
		} catch (error: any) {
			console.log([error.message, error]);
			toast.error(error.response?.data || "Something went wrong!");
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { signup, loading };
}

function handleInputError({
	username = "",
	email = "",
	password = "",
	confirmPassword = "",
}) {
	if (!username || !email || !password || !confirmPassword) {
		toast.error("All fields are required");
		return false;
	}
	if (!isValidEmail(email)) {
		toast.error("Not a valid email address");
		return false;
	}
	if (password !== confirmPassword) {
		toast.error("Passwords do not match!");
		return false;
	}
	if (password.length < 8 || password.length > 20) {
		toast.error("Password must be between 8 and 20 characters long");
		return false;
	}
	if (username.length < 4 || username.length > 20 || username.includes(" ")) {
		toast.error("Username must be 4-20 characters with no spaces");
		return false;
	}
	if (!isAlphaNumeric(username)) {
		toast.error("Only letters and numbers allowed in username!");
		return false;
	}

	return true;
}

const isAlphaNumeric = (str = "") => /^[a-zA-Z0-9]+$/.test(str);
const isValidEmail = (email: string) =>
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);
