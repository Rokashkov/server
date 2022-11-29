import { HttpException, HttpStatus } from '@nestjs/common'
import { ValidationError } from 'class-validator'

export class ValidationException extends HttpException {
	messages: ValidationError[]

	constructor(response: ValidationError[]) {
		super(response, HttpStatus.BAD_REQUEST)
		this.messages = response
	}
}