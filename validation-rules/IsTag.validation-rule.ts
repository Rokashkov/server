import { registerDecorator, ValidationOptions } from 'class-validator'

export function IsTag (validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'IsTag',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any) {
					const tags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
					for (let tag of tags) {
						if (value === tag) {
							return true
						}
					}
					return false
				}
			}
		})
	}
}