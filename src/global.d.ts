declare module NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production'
		PORT: number
		JWT_SECRET: string
		CLIENT_URL: string
	}
}

type tag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type content = { tag: tag, text: string }[]