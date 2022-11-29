import { HttpException, Injectable } from '@nestjs/common'
import prisma from '../prisma'
import { Meta } from '@prisma/client'
import { GetMetaDto } from './dto/get-meta.dto'
import { UpdateMetaDto } from './dto/update-meta.dto'

@Injectable()
export class MetaService {

	async get(body: GetMetaDto): Promise<Meta> {
		const { name } = body
		let meta = await prisma.meta.findUnique({ where: { name } })
		if (!meta) {
			throw new HttpException('Bad Request', 400)
		}
		return meta
	}

	async update(body: UpdateMetaDto): Promise<Meta> {
		const { title, description, keywords, name } = body
		let meta = await this.get({ name })
		if (!meta) {
			throw new HttpException('Bad Request', 400)
		}
		meta = await prisma.meta.update({ where: { name }, data: { title, description, keywords } })
		return meta
	}
}