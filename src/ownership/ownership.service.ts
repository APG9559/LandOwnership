/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
// import { CreateOwnershipDto } from './dto/create-ownership.dto';
// import { UpdateOwnershipDto } from './dto/update-ownership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ownership } from './entities/ownership.entity';
import { DeedParty } from '../deed-parties/entities/deed-party.entity';

@Injectable()
export class OwnershipService {
  constructor (
  @InjectRepository(Ownership)
  private ownershipRepo: Repository<Ownership>,

  @InjectRepository(DeedParty)
  private deedPartyRepo: Repository<DeedParty>, //  ADD THIS
) {}
  // create(createOwnershipDto: CreateOwnershipDto) {
  //   return 'This action adds a new ownership';
  // }

  // findAll() {
  //   return `This action returns all ownership`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} ownership`;
  // }

  // update(id: number, updateOwnershipDto: UpdateOwnershipDto) {
  //   return `This action updates a #${id} ownership`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} ownership`;
  // }
  async getCurrentOwner(property_id: string) {
  return this.ownershipRepo.find({
    where: {
      property_id,
      is_current_owner: true,
    },
  });
  }
  async transferOwnershipFromDeed(property_id: string, deed_id: string) {
  // 1. Get all GRANTEES (buyers)
  const buyers = await this.deedPartyRepo.find({
    where: { deed_id, role: 'GRANTEE' },
  });

  // 2. Close previous owners
  await this.ownershipRepo.update(
    { property_id, is_current_owner: true },
    {
      is_current_owner: false,
      ownership_to_date: new Date(),
    },
  );

  // 3. Create new ownership records
  const newOwners = buyers.map(buyer =>
    this.ownershipRepo.create({
      property_id,
      party_id: buyer.party_id,
      source_deed_id: deed_id,
      ownership_basis: 'SALE',
      share_numerator: buyer.share_numerator,
      share_denominator: buyer.share_denominator,
      ownership_from_date: new Date(),
      is_current_owner: true,
    }),
  );

  return this.ownershipRepo.save(newOwners);
}
  async transferOwnership(
    property_id: string,
    new_owner_id: string,
    deed_id: string,
  ) {
    // 1. Remove current owner
    await this.ownershipRepo.update(
      { property_id, is_current_owner: true },
      {
        is_current_owner: false,
        ownership_to_date: new Date(),
      },
    );

    // 2. Create new ownership record
    const newOwnership = this.ownershipRepo.create({
      property_id,
      party_id: new_owner_id,
      source_deed_id: deed_id,
      ownership_basis: 'SALE',
      ownership_from_date: new Date(),
      is_current_owner: true,
    });

    return this.ownershipRepo.save(newOwnership);
  }
  async findCurrentOwnersByProperty(propertyId: string) {
  return this.ownershipRepo.find({
    where: { property_id: propertyId, is_current_owner: true },
    relations: ['party'],
  });
}
}
