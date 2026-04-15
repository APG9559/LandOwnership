/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateDeedDto } from './dto/create-deed.dto';
// import { UpdateDeedDto } from './dto/update-deed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deed } from './entities/deed.entity';
import { OwnershipService } from '../ownership/ownership.service';
import { DeedPartiesService } from '../deed-parties/deed-parties.service';
import { Encumbrance } from '../encumbrances/entities/encumbrance.entity';

@Injectable()
export class DeedsService {
  constructor(
  @InjectRepository(Deed)
  private deedRepo: Repository<Deed>,
  private ownershipService: OwnershipService,
  private deedPartiesService: DeedPartiesService, //  ADD THIS
  @InjectRepository(Encumbrance)
  private encRepo: Repository<Encumbrance>, //  ADD THIS
) {}

  findAll() {
    return `This action returns all deeds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deed`;
  }

  remove(id: number) {
    return `This action removes a #${id} deed`;
  }

  async create(dto: CreateDeedDto) {
  // 1. Create deed
    const deed = this.deedRepo.create(dto);
    const savedDeed = await this.deedRepo.save(deed);

   return savedDeed;
  }

  async createWithTransfer(dto: CreateDeedDto, buyerId: string) {
  // 1. Create deed
  const deed = this.deedRepo.create(dto);
  const savedDeed = await this.deedRepo.save(deed);

  // 2. Transfer ownership
  await this.ownershipService.transferOwnership(
    dto.property_id,
    buyerId,
    savedDeed.deed_id,
  );

  return {
    message: 'Deed created and ownership transferred',
    deed: savedDeed,
  };
  } 
  

async createFullDeed(dto: CreateDeedDto & { parties: any[] }) {
  // ✅ FIRST extract
  const { parties, ...deedData } = dto;

  // ✅ THEN use it
  const activeEnc = await this.encRepo.findOne({
    where: {
      property_id: deedData.property_id,
      enc_status: 'ACTIVE',
    },
  });

  if (activeEnc) {
    throw new Error('Property has active loan, cannot transfer');
  }

  // 1. Create deed
  const savedDeed = await this.deedRepo.save(
    this.deedRepo.create(deedData),
  );

  // 2. Add parties
  await this.deedPartiesService.createMultiple(
    savedDeed.deed_id,
    parties,
  );

  // 3. Transfer ownership
  await this.ownershipService.transferOwnershipFromDeed(
    deedData.property_id,
    savedDeed.deed_id,
  );

  return {
    message: 'Deed created, parties added, ownership updated',
    deed: savedDeed,
  };
}
}
