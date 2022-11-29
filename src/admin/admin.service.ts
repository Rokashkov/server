import { HttpException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import prisma from 'src/prisma'
import { LoginUserDto } from './dto/login-user.dto'

@Injectable()
export class UserService {
	constructor(private jwtService: JwtService) {}

	async login (body: LoginUserDto): Promise<string> {
		const { name, password } = body
		const user = await prisma.user.findUnique({
			where: { name }
		})
		if (!user) {
			throw new HttpException('Bad Request', 400)
		}
		if (password !== user.password) {
			throw new HttpException('Bad Requset', 400)
		}
		const token = this.generateToken({ name })
		await prisma.user.update({
			where: { name },
			data: { token }
		})
		return token
	}

	async logout (refreshToken: string): Promise<void> {
		const { name } = this.jwtService.verify(refreshToken)
		const user = await prisma.user.findUnique({
			where: { name }
		})
		if (!user) {
			throw new HttpException('Unauthorized', 401)
		}
		await prisma.user.update({
			where: { name },
			data: { token: '' }
		})
	}

	generateToken (payload: any): string {
		const token = this.jwtService.sign(payload)
		return token
	}
}
