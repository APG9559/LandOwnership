/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeedParty } from './entities/deed-party.entity';
import { DeedPartiesService } from './deed-parties.service';
import { DeedPartiesController } from './deed-parties.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DeedParty])],
  controllers: [DeedPartiesController],
  providers: [DeedPartiesService],
  exports: [DeedPartiesService], //  IMPORTANT
})
export class DeedPartiesModule {}