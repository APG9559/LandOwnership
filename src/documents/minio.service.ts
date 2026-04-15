/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private client: Minio.Client;

  constructor() {
    this.client = new Minio.Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'minioadmin',
      secretKey: 'minioadmin',
    });
  }

  async uploadFile(bucket: string, fileName: string, buffer: Buffer) {
    await this.client.putObject(bucket, fileName, buffer);
    return fileName;
  }

  async getFileUrl(bucket: string, fileName: string) {
    return `http://localhost:9000/${bucket}/${fileName}`;
  }
}