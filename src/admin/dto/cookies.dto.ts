import { IsDefined, IsNotEmpty, IsString } from "class-validator"

export class CookiesDto {
	@IsDefined({ message: 'токен обновления (refreshToken) должен быть указан' })
	@IsNotEmpty({ message: 'токен обновления (refreshToken) не может быть пустым' })
	@IsString({ message: 'токен обновления (refreshToken должен быть строкой' })
	token: string
}