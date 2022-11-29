import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { ValidationPipe } from 'pipes/validation.pipe'
import { JwtAuthGuard } from 'src/admin/jwt-auth.guard'
import { MetaService } from './meta.service'
import { GetMetaDto } from './dto/get-meta.dto'
import { UpdateMetaDto } from './dto/update-meta.dto'

@Controller('meta')
export class MetaController {
	constructor(private metaService: MetaService) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(ValidationPipe)
	@Post('update')
	async updateMeta (@Body() body: UpdateMetaDto) {
		const meta = await this.metaService.update(body)
		return meta
	}

	@UsePipes(ValidationPipe)
	@Post('get')
	async getMeta (@Body() body: GetMetaDto) {
		const meta = await this.metaService.get(body)
		return meta
	}
}
