import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GridFSFile } from 'mongodb';

import { FilesService } from './files.service';

@Controller('/files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('')
  @UseInterceptors(FilesInterceptor('photos'))
  upload(@UploadedFiles() files) {
    return files;
  }

  @Get('info/:id')
  async getFileInfo(@Param('id') id: string): Promise<GridFSFile> {
    try {
      const fileInfo = await this.filesService.findInfo(id);
      return fileInfo;
    } catch (err) {
      console.log(err);
      throw new HttpException('An error occurred while retrieving file information', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get(':id')
  async getFile(@Param('id') id: string, @Res() res) {
    try {
      const fileInfo = await this.filesService.findInfo(id);
      const fileStream = await this.filesService.readStream(id);

      res.header('Content-Type', fileInfo.contentType);
      return fileStream.pipe(res);
    } catch (err) {
      console.log(err);
      throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('download/:id')
  async downloadFile(@Param('id') id: string, @Res() res) {
    try {
      const file = await this.filesService.findInfo(id);
      const fileStream = await this.filesService.readStream(id);

      res.header('Content-Type', file.contentType);
      res.header('Content-Disposition', 'attachment; filename=' + file.filename);

      return fileStream.pipe(res);
    } catch (err) {
      console.log(err);
      throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('/delete/:id')
  async deleteFile(@Param('id') id: string): Promise<Partial<GridFSFile> & { message: string }> {
    try {
      const fileInfo = await this.filesService.findInfo(id);
      await this.filesService.deleteFile(id);

      return {
        ...fileInfo,
        message: 'File has been deleted',
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('An error occurred during file deletion', HttpStatus.EXPECTATION_FAILED);
    }
  }
}
