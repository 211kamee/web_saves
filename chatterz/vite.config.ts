import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	server: {
		// port: 3000,
		proxy: {
			// "/api": "https://chatterzapi.onrender.com/",
			// "/api": "http://localhost:3000/",
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
