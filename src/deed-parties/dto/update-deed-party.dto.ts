import { PartialType } from '@nestjs/mapped-types';
import { CreateDeedPartyDto } from './create-deed-party.dto';

export class UpdateDeedPartyDto extends PartialType(CreateDeedPartyDto) {}
