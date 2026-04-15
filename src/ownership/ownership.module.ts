/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ownership } from './entities/ownership.entity';
import { DeedParty } from '../deed-parties/entities/deed-party.entity';
import { OwnershipService } from './ownership.service';
import { OwnershipController } from './ownership.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ownership, DeedParty]),
  ],
  controllers: [OwnershipController],
  providers: [OwnershipService],
  exports: [OwnershipService], //  IMPORTANT
})
export class OwnershipModule {}