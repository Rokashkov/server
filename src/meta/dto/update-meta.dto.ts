import { ArrayNotEmpty, IsArray, IsDefined, IsNotEmpty, IsString } from 'class-validator'

export class UpdateMetaDto {
	@IsDefined({ message: 'путь страницы (name) должен быть указано' })
	@IsNotEmpty({ message: 'путь страницы (name) не может быть пустым' })
	@IsString({ message: 'путь страницы (name) должен быть строкой' })
	name: string

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
}