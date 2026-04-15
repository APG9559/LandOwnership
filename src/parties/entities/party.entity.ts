/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('parties')
export class Party {
  @PrimaryGeneratedColumn('uuid')
  party_id: string;

  @Column()
  party_type: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  org_name: string;

  @Column({ nullable: true })
  pan_number: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;
}