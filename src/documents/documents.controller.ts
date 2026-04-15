/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private docService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Multer.File,
    @Body() body: any,
  ) {
    return this.docService.upload(file, body);
  }
}