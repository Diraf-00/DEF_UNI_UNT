import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CasosService } from './casos.service';
import type { CreateCasoDto } from './dto/create-caso.dto';
import type { UpdateCasoDto } from './dto/update-caso.dto';

@Controller('casos')
export class CasosController {
  constructor(private casosService: CasosService) {}

  @Get()
  getAllCasos() {
    return this.casosService.getAllCasos();
  }

  @Get(':id')
  getCasoById(@Param('id') id: string) {
    return this.casosService.getCasoById(id);
  }

  @Post()
  createCaso(@Body() createCasoDto: CreateCasoDto) {
    return this.casosService.createCaso(createCasoDto);
  }

  @Post(':id/actualizaciones')
  createActualizacion(
    @Param('id') id: string,
    @Body() createActualizacionDto: UpdateCasoDto,
  ) {
    return this.casosService.createActualizacion(id, createActualizacionDto);
  }
}
