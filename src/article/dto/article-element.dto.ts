import { IsDefined, IsNotEmpty, IsString } from 'class-validator'
import { IsTag } from 'validation-rules/IsTag.validation-rule'

export class ArticleElement {
	@IsDefined({ message: 'тэг элемента статьи (tag) должен быть указан' })
	@IsNotEmpty({ message: 'тэг элеметна статьи (tag) не должен быть пустым' })
	@IsString({ message: 'тэг элемента статьи (tag) должен быть строкой' })
	@IsTag({ message: 'тэг элеметна статьи (tag) должен иметь значения: p, h1, h2, ..., h6' })
	tag: tag

	@IsDefined({ message: 'текст элеметна статьи (text) должен быть указан' })
	@IsNotEmpty({ message: 'текст элеметна статьи (text) не должен быть пустым' })
	@IsString({ message: 'текст элеметна статьи (text) должен быть строкой' })
	text: string
}