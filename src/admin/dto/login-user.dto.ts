import { IsDefined, IsNotEmpty, IsString } from 'class-validator'

export class LoginUserDto {
	@IsDefined({ message: 'пароль пользователя (password) должен быть указан' })
	@IsNotEmpty({ message: 'пароль пользователя (password) не может быть пустым' })
	@IsString({ message: 'пароль пользователя (password) должен быть строкой' })
	password: string

	@IsDefined({ message: 'имя пользователя (name) должно быть указано' })
	@IsNotEmpty({ message: 'имя пользователя (name) не может быть пустым' })
	@IsString({ message: 'имя пользователя (name) должно быть строкой' })
	name: string
}