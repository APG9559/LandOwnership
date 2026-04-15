/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePartyDto } from './dto/create-party.dto';
import { Party } from './entities/party.entity';

@Injectable()
export class PartiesService {
  constructor(
    @InjectRepository(Party)
    private repo: Repository<Party>,
  ) {}

  async create(dto: CreatePartyDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    return this.repo.findOne({ where: { party_id: id } });
  }
}