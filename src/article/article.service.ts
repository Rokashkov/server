import { HttpException, Injectable } from '@nestjs/common'
import prisma from '../prisma'
import { Article } from '@prisma/client'
import { CreateArticleDto } from './dto/create-article.dto'
import { DeleteArticleDto } from './dto/delete-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Injectable()
export class ArticleService {
	async getById({ id, path }: { id: number, path: string }): Promise<Article> {
		let article = await prisma.article.findUnique({
			where: { id }
		})
		if (!article) {
			throw new HttpException('Not Found', 404)
		}
		if (path === '/article/:id') {
			article = await prisma.article.update({ where: { id }, data: { views: ++article.views } })
		}
		return article
	}

	async getAll(page: number, limit: number): Promise<{ articles: Article[], total: number }> {
		const offset = page * limit - limit
		const total = await prisma.article.count()
		if (total + ((total % limit) ? limit - (total % limit) : 0) < page * limit) {
			throw new HttpException('NotFound', 404)
		}
		const articles = await prisma.article.findMany({
			skip: offset,
			take: limit
		})
		if (!articles[0]) {
			throw new HttpException('Not Found', 404)
		}
		return { articles, total }
	}

	async create(body: CreateArticleDto): Promise<Article> {
		const { title, description, keywords, content } = body
		const article = await prisma.article.create({
			data: { title, description, keywords, content: content as content }
		})
		return article
	}

	async update(body: UpdateArticleDto): Promise<Article> {
		const { id, title, description, keywords, content } = body
		await this.getById({ id, path: '/admin/edit/:id' })
		const article = await prisma.article.update({
			where: { id },
			data: { title, description, keywords, content: content as content }
		})
		return article
	}

	async delete(body: DeleteArticleDto): Promise<Article> {
		const { id } = body
		await this.getById({ id, path: '/admin/edit/:id' })
		const article = await prisma.article.delete({
			where: { id }
		})
		return article
	}
}