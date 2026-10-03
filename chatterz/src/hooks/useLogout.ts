import { useState } from "react";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useLogout() {
	const navigate = useNavigate();
	const { API_URL, setUser } = useAuthContext();
	const [loading, setLoading] = useState(false);

	const logout = async () => {
		setLoading(true);
		try {
			await axios.post(
				API_URL + "/api/auth/logout",
				{},
				{
					withCredentials: true,
				}
			);
			
			setUser(null);
			localStorage.clear();
			toast.success("Logged out successfully!");
			navigate("/");
		} catch (error: any) {
			console.log([error.message, error]);
			toast.error(error.response?.data || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	return { logout, loading };
}
