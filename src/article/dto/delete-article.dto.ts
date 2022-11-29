import { IsDefined, IsInt, IsNotEmpty } from 'class-validator'

export class DeleteArticleDto {
	@IsDefined({ message: 'уникальный идентификатор (id) должен быть указан' })
	@IsNotEmpty({ message: 'уникальный идентификатор (id) не может быть пустым' })
	@IsInt({ message: 'уникальный идентификатор (id) должен быть целым числом' })
	id: number
}