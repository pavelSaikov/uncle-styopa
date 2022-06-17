import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { MongoClient } from 'mongodb';
import { GridFsStorage } from 'multer-gridfs-storage/lib/gridfs';

import { EnvVariable } from 'src/models';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  private gridFsStorage: GridFsStorage;

  constructor(private configService: ConfigService) {
    const username = configService.get<string>(EnvVariable.DB_USERNAME);
    const password = configService.get<string>(EnvVariable.DB_PASSWORD);
    const host = configService.get<string>(EnvVariable.DB_HOST);
    const port = configService.get<string>(EnvVariable.DB_PORT);
    const database = configService.get<string>(EnvVariable.DB_DATABASE);
    const url = `mongodb://${username}:${password}@${host}:${port}`;

    const db = MongoClient.connect(url).then((client) => client.db(database));

    this.gridFsStorage = new GridFsStorage({ db });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
