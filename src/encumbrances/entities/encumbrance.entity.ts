/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('encumbrances')
export class Encumbrance {
  @PrimaryGeneratedColumn('uuid')
  encumbrance_id: string;

  @Column()
  property_id: string;

  @Column()
  enc_type_id: number;

  @Column()
  creditor_party_id: string;

  @Column()
  debtor_party_id: string;

  @Column('decimal', { nullable: true })
  encumbrance_amount: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ default: 'ACTIVE' })
  enc_status: string;
}