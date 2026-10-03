import { useState, createContext, useContext } from "react";

interface AuthContextType {
	user: any;
	setUser: (user: any) => void;
	API_URL: String;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
	API_URL: "",
});

export const AuthContextProvider = ({ children }: { children: any }) => {
	const API_URL =
		import.meta.env.VITE_API_URL || "https://chatterzapi.onrender.com";
	const [user, setUser] = useState<any>(
		JSON.parse(localStorage.getItem("user") || "null") || null
	);

	return (
		<AuthContext.Provider value={{ API_URL, user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
