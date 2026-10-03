interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// env variables
interface ImportMetaEnv {
	readonly VITE_API_URL: string;
}
