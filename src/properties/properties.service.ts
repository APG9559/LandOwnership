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

    async getSystemOverview() {
    // Map land_type_id to type name (should match your DB mapping)
    const typeMap = {
      1: 'Residential',
      2: 'Commercial',
      3: 'Agricultural',
      4: 'Industrial',
      5: 'Other',
    };

    // Get counts for each type
    const qb = this.propertyRepo.createQueryBuilder('property');
    const counts = await qb
      .select('property.land_type_id', 'land_type_id')
      .addSelect('COUNT(*)', 'count')
      .groupBy('property.land_type_id')
      .getRawMany();

    // Calculate total
    const total = counts.reduce((sum, c) => sum + Number(c.count), 0);

    // Format for frontend
    const result = {
      total,
      breakdown: [
        { type: 'Residential', count: 0 },
        { type: 'Commercial', count: 0 },
        { type: 'Agricultural', count: 0 },
        { type: 'Industrial', count: 0 },
        { type: 'Other', count: 0 },
      ],
    };
    counts.forEach(c => {
      const idx = Object.keys(typeMap).indexOf(String(c.land_type_id));
      if (idx !== -1) {
        result.breakdown[idx].count = Number(c.count);
      }
    });
    return result;
  }
}