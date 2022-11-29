import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards, UsePipes } from '@nestjs/common'
import { Request } from 'express'
import { ValidationPipe } from 'pipes/validation.pipe'
import { JwtAuthGuard } from 'src/admin/jwt-auth.guard'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { DeleteArticleDto } from './dto/delete-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Controller('article')
export class ArticleController {
	constructor(private articleService: ArticleService) {}

	@Get('all')
	async getAllArticles (
		@Query('page', new DefaultValuePipe(1), ParseIntPipe)
		page: number,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe)
		limit: number
	) {
		const { articles, total } = await this.articleService.getAll(page, limit)
		return { articles, total }
	}

	@Get(':id')
	async getArticle (@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
		const { path } = req.route
		const article = await this.articleService.getById({ id, path })
		return article
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(ValidationPipe)
	@Post('create')
	async createArticle (@Body() body: CreateArticleDto) {
		const article = await this.articleService.create(body)
		return article
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(ValidationPipe)
	@Post('update')
	async updateArticle (@Body() body: UpdateArticleDto) {
		const article = await this.articleService.update(body)
		return article
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(ValidationPipe)
	@Post('delete')
	async deleteArticle (@Body() body: DeleteArticleDto) {
		const article = await this.articleService.delete(body)
		return article
	}
}
