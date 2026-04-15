/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertyRepo: Repository<Property>,
  ) {}

  async create(dto: CreatePropertyDto) {
    const property = this.propertyRepo.create(dto);
    return this.propertyRepo.save(property);
  }

  async findAll() {
    return this.propertyRepo.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string) {
    const property = await this.propertyRepo.findOne({
      where: { property_id: id },
    });

    if (!property) throw new NotFoundException('Property not found');

    return property;
  }

  async findByRefCode(ref: string) {
    return this.propertyRepo.findOne({
      where: { property_ref_code: ref },
    });
  }

  async search(query: string) {
    return this.propertyRepo.find({
      where: [
        { property_ref_code: ILike(`%${query}%`) },
        { survey_number: ILike(`%${query}%`) },
        { plot_number: ILike(`%${query}%`) },
      ],
    });
  }

  async update(id: string, dto: UpdatePropertyDto) {
    await this.propertyRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.propertyRepo.delete(id);
  }
}