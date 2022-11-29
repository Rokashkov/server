import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from '../exceptions/validation.exception'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
		const object = plainToInstance(metadata.metatype, value)
		const errors = await validate(object)
		if (errors.length) {
			throw new ValidationException(errors)
		}
		return value
	}
}