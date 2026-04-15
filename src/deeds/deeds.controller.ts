/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { DeedsService } from './deeds.service';
// import { CreateDeedDto } from './dto/create-deed.dto';
// import { UpdateDeedDto } from './dto/update-deed.dto';

@Controller('deeds')
export class DeedsController {
  constructor(private readonly deedsService: DeedsService,
    
  ) {}

  @Post('full')
  createFull(@Body() dto: any) {
  return this.deedsService.createFullDeed(dto);
  }
}
