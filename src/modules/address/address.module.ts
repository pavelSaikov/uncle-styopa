import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Address, AddressRepository, AddressSchema, MongoAddressRepository } from './repository';
import { AddressService } from './address.service';

@Module({
  exports: [AddressService],
  imports: [MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }])],
  providers: [{ provide: AddressRepository, useClass: MongoAddressRepository }, AddressService],
})
export class AddressModule {}
