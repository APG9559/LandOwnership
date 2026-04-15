/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEncumbranceDto } from './dto/create-encumbrance.dto';
import { Encumbrance } from './entities/encumbrance.entity';

@Injectable()
export class EncumbrancesService {
  constructor(
    @InjectRepository(Encumbrance)
    private repo: Repository<Encumbrance>,
  ) {}

  async create(dto: CreateEncumbranceDto) {
    const enc = this.repo.create({
      ...dto,
      start_date: new Date(),
      enc_status: 'ACTIVE',
    });

    return this.repo.save(enc);
  }

  async findAll() {
    return this.repo.find();
  }

  async discharge(id: string) {
    return this.repo.update(id, {
      enc_status: 'DISCHARGED',
      end_date: new Date(),
    });
  }
}