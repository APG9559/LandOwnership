/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  property_id: string;

  @Column()
  village_id: number;

  @Column({ nullable: true })
  survey_number: string;

  @Column({ nullable: true })
  sub_division: string;

  @Column({ nullable: true })
  plot_number: string;

  @Column({ nullable: true })
  hissa_number: string;

  @Column({ nullable: true })
  cts_number: string;

  @Column({ nullable: true })
  khata_number: string;

  @Column({ unique: true })
  property_ref_code: string;

  @Column()
  land_type_id: number;

  @Column('decimal', { precision: 12, scale: 4, nullable: true })
  total_area_sqmt: number;

  @Column('decimal', { precision: 12, scale: 4, nullable: true })
  total_area_acres: number;

  @Column('decimal', { precision: 12, scale: 4, nullable: true })
  total_area_cents: number;

  @Column({ default: 'SQMT' })
  area_unit_primary: string;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  guideline_value: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  market_value: number;

  @Column({ default: 'ACTIVE' })
  property_status: string;

  @Column({ default: 'CLEAR' })
  title_status: string;

  @Column({ nullable: true })
  remarks: string;

  @Column({ nullable: true })
  created_by: string;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  updated_at: Date;
}