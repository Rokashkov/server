import { Module } from '@nestjs/common'
import { UserModule } from 'src/admin/admin.module'
import { MetaController } from './meta.controller'
import { MetaService } from './meta.service'

@Module({
	controllers: [MetaController],
	providers: [MetaService],
	imports: [UserModule]
})
export class MetaModule {}
