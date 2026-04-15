/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ownership_records')
export class Ownership {
  @PrimaryGeneratedColumn('uuid')
  ownership_id: string;

  @Column()
  property_id: string;

  @Column()
  party_id: string;

  @Column({ nullable: true })
  source_deed_id: string;

  @Column()
  ownership_basis: string;

  @Column({ default: 1 })
  share_numerator: number;

  @Column({ default: 1 })
  share_denominator: number;

  @Column({ type: 'date' })
  ownership_from_date: Date;

  @Column({ type: 'date', nullable: true })
  ownership_to_date: Date;

  @Column({ default: false })
  is_current_owner: boolean;
}