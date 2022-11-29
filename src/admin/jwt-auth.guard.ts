import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import prisma from 'src/prisma'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor (private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest()
		try {
			const authHeader = req.headers.authorization
			if (!authHeader) {
				throw new HttpException('Unauthorized', 401)
			}
			const bearer = authHeader.split(' ')[0]
			const token = authHeader.split(' ')[1]
			if (bearer !== 'Bearer' || !token) {
				throw new HttpException('Unauthorized', 401)
			}
			const user = await prisma.user.findFirst({
				where: { token }
			})
			if (!user) {
				throw new HttpException('Unauthorized', 401)
			}
			const payload = this.jwtService.verify(token)
			req.user = payload
			return true
		} catch (err) {
			throw new HttpException('Unauthorized', 401)
		}
	}
}