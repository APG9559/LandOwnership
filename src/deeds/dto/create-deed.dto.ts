/* eslint-disable prettier/prettier */
export class CreateDeedDto {
  deed_number: string;
  deed_type_id: number;
  registration_office_id: number;
  property_id: string;
  execution_date: Date;
  registration_date: Date;
}