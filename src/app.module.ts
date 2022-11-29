import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ArticleModule } from './article/article.module'
import { UserModule } from './admin/admin.module'
import { MetaModule } from './meta/meta.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${ process.env.NODE_ENV }`,
			isGlobal: true
		}),
		ArticleModule,
		UserModule,
		MetaModule
	]
})
export class AppModule {}