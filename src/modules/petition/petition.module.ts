import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule, FilesModule, UserModule } from 'src/modules';
import { PetitionService } from './petition.service';
import { MongoPetitionRepository, Petition, PetitionSchema, PetitionRepository } from './repository';

@Module({
  exports: [PetitionService],
  imports: [
    MongooseModule.forFeature([{ name: Petition.name, schema: PetitionSchema }]),
    UserModule,
    AuthModule,
    FilesModule,
  ],
  providers: [{ provide: PetitionRepository, useClass: MongoPetitionRepository }, PetitionService],
})
export class PetitionModule {}
