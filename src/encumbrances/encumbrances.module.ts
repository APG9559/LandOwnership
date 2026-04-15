/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encumbrance } from './entities/encumbrance.entity';
import { EncumbrancesService } from './encumbrances.service';
import { EncumbrancesController } from './encumbrances.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Encumbrance])],
  controllers: [EncumbrancesController],
  providers: [EncumbrancesService],
})
export class EncumbrancesModule {}