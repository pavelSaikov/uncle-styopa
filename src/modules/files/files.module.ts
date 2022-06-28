import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { GridFsMulterConfigService } from './files-config.service';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  controllers: [FilesController],
  exports: [FilesService],
  providers: [GridFsMulterConfigService, FilesService],
})
export class FilesModule {}
