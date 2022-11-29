import { Body, Controller, Get, Post, Res, UseGuards, UsePipes } from '@nestjs/common'
import { Cookies } from 'decorators/cookie.decorator'
import { CookieOptions, Response } from 'express'
import { ValidationPipe } from 'pipes/validation.pipe'
import { CookiesDto } from './dto/cookies.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { JwtAuthGuard } from './jwt-auth.guard'
import { UserService } from './admin.service'

@Controller('admin')
export class UserController {
	constructor(private userService: UserService) {}

	@UsePipes(ValidationPipe)
	@Post('login')
	async login (@Body() body: LoginUserDto, @Res({ passthrough: true }) res: Response) {
		const token = await this.userService.login(body)
		let cookieOptions: CookieOptions
		if (process.env.NODE_ENV === 'development') {
			cookieOptions = {
				maxAge: 100 * 60 * 30,
				httpOnly: true,
			}
		}
		if (process.env.NODE_ENV === 'production') {
			cookieOptions = {
				maxAge: 100 * 60 * 30,
				secure: true
			}
		}
		res.cookie('token', token, cookieOptions)
		res.json({ token })
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	async logout (@Cookies() cookies: CookiesDto, @Res({ passthrough: true }) res: Response) {
		const { token } = cookies
		await this.userService.logout(token)
		res.clearCookie('token')
	}

	@UseGuards(JwtAuthGuard)
	@Get('check')
	async isAuth() {
		return
	}
}
