import { PartialType } from '@nestjs/mapped-types';
import { CreateEncumbranceDto } from './create-encumbrance.dto';

export class UpdateEncumbranceDto extends PartialType(CreateEncumbranceDto) {}
