import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { GridFSBucket, GridFSBucketReadStream, GridFSFile, ObjectId } from 'mongodb';
import { Connection } from 'mongoose';

import { EnvVariable } from 'src/models';

@Injectable()
export class FilesService {
  private bucket: GridFSBucket;

  constructor(@InjectConnection() private readonly connection: Connection, private configService: ConfigService) {
    this.bucket = new GridFSBucket(connection.db, {
      bucketName: configService.get<string>(EnvVariable.DB_FILES_COLLECTION_PREFIX),
    });
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.bucket.openDownloadStream(ObjectId(id));
  }

  async findInfo(id: string): Promise<GridFSFile> {
    const result = await this.bucket.find({ _id: ObjectId(id) }).toArray();

    if (!result.length) {
      throw Error('Image not found');
    }

    const imageInfo = result[0];

    return imageInfo;
  }

  async deleteFile(id: string): Promise<boolean> {
    return await this.bucket.delete(ObjectId(id));
  }
}
