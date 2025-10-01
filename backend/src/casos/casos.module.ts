import { Module } from '@nestjs/common';
import { CasosService } from './casos.service';
import { CasosController } from './casos.controller';

@Module({
  providers: [CasosService],
  controllers: [CasosController],
})
export class CasosModule {}
