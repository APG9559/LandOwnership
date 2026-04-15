/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put
} from '@nestjs/common';
import { EncumbrancesService } from './encumbrances.service';
import { CreateEncumbranceDto } from './dto/create-encumbrance.dto';
// import { UpdateEncumbranceDto } from './dto/update-encumbrance.dto';

@Controller('encumbrances')
export class EncumbrancesController {
  constructor(private readonly encumbrancesService: EncumbrancesService) {}
  @Post()
  create(@Body() dto: CreateEncumbranceDto) {
    return this.encumbrancesService.create(dto);
  }

  @Get()
  findAll() {
    return this.encumbrancesService.findAll();
  }

  @Put(':id/discharge')
  discharge(@Param('id') id: string) {
    return this.encumbrancesService.discharge(id);
  }
}
