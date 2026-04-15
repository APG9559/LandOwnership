/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('deeds')
export class Deed {
  @PrimaryGeneratedColumn('uuid')
  deed_id: string;

  @Column({ unique: true })
  deed_number: string;

  @Column()
  deed_type_id: number;

  @Column()
  registration_office_id: number;

  @Column()
  property_id: string;

  @Column({ type: 'date' })
  execution_date: Date;

  @Column({ type: 'date' })
  registration_date: Date;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  consideration_amount: number;

  @Column({ default: 'REGISTERED' })
  deed_status: string;
}