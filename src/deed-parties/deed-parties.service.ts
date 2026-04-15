/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
// import { CreateDeedPartyDto } from './dto/create-deed-party.dto';
// import { UpdateDeedPartyDto } from './dto/update-deed-party.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeedParty } from './entities/deed-party.entity';

@Injectable()
export class DeedPartiesService {
  constructor(
  @InjectRepository(DeedParty)
  private repo: Repository<DeedParty>,
) {}

  // create(createDeedPartyDto: CreateDeedPartyDto) {
  //   return 'This action adds a new deedParty';
  // }

  // findAll() {
  //   return `This action returns all deedParties`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} deedParty`;
  // }

  // update(id: number, updateDeedPartyDto: UpdateDeedPartyDto) {
  //   return `This action updates a #${id} deedParty`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} deedParty`;
  // }
  async createMultiple(deed_id: string, parties: any[]) {
  const records = parties.map(p =>
    this.repo.create({
      deed_id,
      party_id: p.party_id,
      role: p.role,
      share_numerator: p.share_numerator || 1,
      share_denominator: p.share_denominator || 1,
    }),
  );

  return this.repo.save(records);
}
}
