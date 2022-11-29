import { IsDefined, IsNotEmpty, IsString } from 'class-validator'

export class GetMetaDto {
	@IsDefined({ message: 'путь страницы (name) должен быть указано' })
	@IsNotEmpty({ message: 'путь страницы (name) не может быть пустым' })
	@IsString({ message: 'путь страницы (name) должен быть строкой' })
	name: string
}