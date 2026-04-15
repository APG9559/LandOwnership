/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from 'multer';

import { Document } from './entities/document.entity';
import { MinioService } from './minio.service';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private docRepo: Repository<Document>,
    private minioService: MinioService,
  ) {}

  async upload(file: File, dto: any) {
    const fileName = `${Date.now()}-${file.originalname}`;

    // 1. Upload to MinIO
    await this.minioService.uploadFile(
      'documents',
      fileName,
      file.buffer,
    );

    // 2. Save in DB
    const doc = this.docRepo.create({
      entity_type: dto.entity_type,
      entity_id: dto.entity_id,
      document_name: file.originalname,
      storage_path: fileName,
    });

    const saved = await this.docRepo.save(doc);

    // 3. Return URL
    const url = await this.minioService.getFileUrl('documents', fileName);

    return {
      ...saved,
      url,
    };
  }
}