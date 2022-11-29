import { IsDefined, IsInt, IsNotEmpty } from 'class-validator'
import { CreateArticleDto } from './create-article.dto'

export class UpdateArticleDto extends CreateArticleDto {
	@IsDefined({ message: 'уникальный идентификатор (id) должен быть указан' })
	@IsNotEmpty({ message: 'уникальный идентификатор (id) не может быть пустым' })
	@IsInt({ message: 'уникальный идентификатор (id) должен быть целым числом' })
	id: number
}