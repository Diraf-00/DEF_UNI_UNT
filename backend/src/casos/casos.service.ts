import { Injectable } from '@nestjs/common';
import { CreateCasoDto } from './dto/create-caso.dto';
import { UpdateCasoDto } from './dto/update-caso.dto';

@Injectable()
export class CasosService {
  getCasoById(id: string) {
    return `devolviendo caso con id ${id}`;
  }
  getAllCasos() {
    return ['caso1', 'caso2', 'caso3'];
  }
  createCaso(createCasoDto: CreateCasoDto) {
    return createCasoDto;
  }
  createActualizacion(id: string, createActualizacionDto: UpdateCasoDto) {
    return [id, createActualizacionDto];
  }
}
