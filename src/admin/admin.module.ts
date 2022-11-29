import { Module } from '@nestjs/common'
import { UserService } from './admin.service'
import { UserController } from './admin.controller'
import { JwtModule } from '@nestjs/jwt'

@Module({
	providers: [UserService],
	controllers: [UserController],
	imports: [JwtModule.register({
		secret: process.env.JWT_SECRET || 'SECRET',
		signOptions: { expiresIn: '30m' }
	})],
	exports: [JwtModule, UserService]
})
export class UserModule {}
