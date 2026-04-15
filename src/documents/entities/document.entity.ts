/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  document_id: string;

  @Column()
  entity_type: string;

  @Column()
  entity_id: string;

  @Column()
  document_name: string;

  @Column()
  storage_path: string;

  @Column({ default: false })
  is_verified: boolean;
}