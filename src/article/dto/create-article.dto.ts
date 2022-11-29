import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsDefined, IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { ArticleElement } from './article-element.dto'

export class CreateArticleDto {
	@IsDefined({ message: 'название страницы (title) должно быть указано' })
	@IsNotEmpty({ message: 'название страницы (title) не может быть пустым' })
	@IsString({ message: 'название страницы (title) должно быть строкой' })
	title: string

	@IsDefined({ message: 'описание страницы (description) должно быть указано' })
	@IsNotEmpty({ message: 'описание страницы (description) не может быть пустым' })
	@IsString({ message: 'описание страницы (description) должно быть строкой' })
	description: string

	@IsDefined({ message: 'ключевые слова страницы (keywords) должны быть указаны' })
	@IsArray({ message: 'ключевые слова страницы (keywords) должны быть массивом' })
	@ArrayNotEmpty({ message: 'ключевые слова страницы (keywords) не могут быть пустыми' })
	@IsNotEmpty({ each: true, message: 'ключевое слово (keyword) должно быть указано' })
	@IsString({ each: true, message: 'ключевое слово (keyword) должно быть строкой' })
	keywords: string[]

	@IsDefined({ message: 'контент статьи (content) должен быть указан' })
	@IsArray({ message: 'контент статьи (content) быть массивом' })
	@ArrayNotEmpty({ message: 'контент статьи (content) не может быть пустым' })
	@ValidateNested({ each: true })
	@Type(() => ArticleElement)
	content: ArticleElement[]
}