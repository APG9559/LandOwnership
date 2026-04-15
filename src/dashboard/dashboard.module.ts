/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../properties/entities/property.entity';
import { Module } from '@nestjs/common';
import { Party } from '../parties/entities/party.entity';
import { Deed } from '../deeds/entities/deed.entity';
import { Ownership } from '../ownership/entities/ownership.entity';
import { Encumbrance } from '../encumbrances/entities/encumbrance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Property,
      Party,
      Deed,
      Ownership,
      Encumbrance,
    ]),
  ],
})
export class DashboardModule {}