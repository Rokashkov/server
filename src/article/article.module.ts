import { Module } from '@nestjs/common'
import { UserModule } from 'src/admin/admin.module'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'

@Module({
	controllers: [ArticleController],
	providers: [ArticleService],
	imports: [UserModule]
})
export class ArticleModule {}
