/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deed } from './entities/deed.entity';
import { DeedsService } from './deeds.service';
import { DeedsController } from './deeds.controller';
import { OwnershipModule } from '../ownership/ownership.module';
import { DeedPartiesModule } from '../deed-parties/deed-parties.module';
import { Encumbrance } from '../encumbrances/entities/encumbrance.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Deed, Encumbrance]),
    OwnershipModule,       //  ADD
    DeedPartiesModule,    //  ADD
  ],
  controllers: [DeedsController],
  providers: [DeedsService],
})
export class DeedsModule {}