/// <reference path="./global.d.ts" />

import { NestFactory } from '@nestjs/core'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

const start = async () => {
	try {
		const NODE_ENV = process.env.NODE_ENV
		const PORT = process.env.PORT

		const  createApp = async () => {
			if (NODE_ENV === 'production') {
				const __certs = resolve(__dirname, '..', '..', '..', '..', 'etc', 'letsencrypt', 'live', 'tomsk-news.ru')
				const httpsOptions = {
					key: readFileSync(resolve(__certs, 'privkey.pem')),
					cert: readFileSync(resolve(__certs, 'fullchain.pem'))
				}
				const app = await NestFactory.create(
					AppModule,
					{
						httpsOptions: httpsOptions,
						cors: true
					}
				)
				return app
			}
			if (NODE_ENV === 'development') {
				const app = await NestFactory.create(
					AppModule,
					{
						cors: {
							credentials: true, 
							origin: process.env.CLIENT_URL,
						}
					}
				)
				return app
			}
		}

		const app = await createApp()
		app.use(cookieParser())
		app.listen(PORT, () => {
			console.log(`Server has been started on PORT: ${ PORT }...`)
		})
	} catch (err) {
		console.log(err)
	}
}

start()