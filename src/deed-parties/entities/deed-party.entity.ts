/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('deed_parties')
export class DeedParty {
  @PrimaryGeneratedColumn('uuid')
  deed_party_id: string;

  @Column()
  deed_id: string;

  @Column()
  party_id: string;

  @Column()
  role: string;

  @Column({ default: 1 })
  share_numerator: number;

  @Column({ default: 1 })
  share_denominator: number;
}