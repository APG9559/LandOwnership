/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { CreatePartyDto } from './dto/create-party.dto';
// import { UpdatePartyDto } from './dto/update-party.dto';

@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Post()
create(@Body() dto: CreatePartyDto) {
  return this.partiesService.create(dto);
}

@Get()
findAll() {
  return this.partiesService.findAll();
}
}
