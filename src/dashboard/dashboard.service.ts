/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Party } from '../parties/entities/party.entity';
import { Deed } from '../deeds/entities/deed.entity';
import { Ownership } from '../ownership/entities/ownership.entity';
import { Encumbrance } from '../encumbrances/entities/encumbrance.entity';
import { Property } from '../properties/entities/property.entity';


@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Property)
    private propertyRepo: Repository<Property>,

    @InjectRepository(Party)
    private partyRepo: Repository<Party>,

    @InjectRepository(Deed)
    private deedRepo: Repository<Deed>,

    @InjectRepository(Ownership)
    private ownershipRepo: Repository<Ownership>,

    @InjectRepository(Encumbrance)
    private encRepo: Repository<Encumbrance>,
  ) {}

  async getStats() {
    return {
      total_properties: await this.propertyRepo.count(),
      total_parties: await this.partyRepo.count(),
      total_deeds: await this.deedRepo.count(),
      active_owners: await this.ownershipRepo.count({
        where: { is_current_owner: true },
      }),
      active_encumbrances: await this.encRepo.count({
        where: { enc_status: 'ACTIVE' },
      }),
    };
  }

  async getRecentDeeds() {
    return this.deedRepo.find({
      order: { registration_date: 'DESC' },
      take: 5,
    });
  }

  async getEncumbrances() {
    return this.encRepo.find({
      where: { enc_status: 'ACTIVE' },
      take: 5,
    });
  }

  async getRecentActivity() {
    return [
      { text: 'Deed created', time: '2 hours ago' },
      { text: 'Ownership updated', time: '4 hours ago' },
    ];
  }
}