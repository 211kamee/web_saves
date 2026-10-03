import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
	const navigate = useNavigate();
	const { API_URL, setUser } = useAuthContext();
	const [loading, setLoading] = useState(false);

	const login = async ({ username = "", password = "" }) => {
		if (!username || !password) {
			toast.error("All fields are required");
			return false;
		}

		setLoading(true);
		try {
			const res = await axios.post(
				API_URL + "/api/auth/login",
				{ username, password },
				{ withCredentials: true }
			);

			setUser(res.data.user);
			localStorage.setItem("user", JSON.stringify(res.data.user));
			toast.success(`Logged in as ${username}!`);

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

	return { login, loading };
}
