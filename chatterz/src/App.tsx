import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./pages/auth/Header.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/SignUp.tsx";
import Main from "./pages/auth/Hero.tsx";
import Nav from "./pages/user/Nav.tsx";
import ChatLayout from "./pages/user/ChatLayout.tsx";
import { useAuthContext } from "./context/AuthContext.tsx";
import { useEffect } from "react";

export default function App() {
	const { user, setUser } = useAuthContext();

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("user") || "null") || null);
	}, []);

	return (
		<Routes>
			<Route
				path="*"
				element={
					user ? (
						<Navigate to="/user/convo" />
					) : (
						<Navigate to="/auth" />
					)
				}
			></Route>
			<Route path="/auth/" element={<Header />}>
				<Route path="" element={<Main />}></Route>
				<Route path="login/" element={<Login />}></Route>
				<Route path="signup/" element={<Register />}>
					{" "}
				</Route>
			</Route>
			<Route path="/user/">
				<Route path="" element={<Navigate to="/user/convo" />}></Route>
				<Route path="convo/" element={<Nav />}>
					<Route path="" element={<ChatLayout />}></Route>
				</Route>
				<Route path="settings/" element={<h1> Profile</h1>}></Route>
			</Route>
		</Routes>
	);
}
