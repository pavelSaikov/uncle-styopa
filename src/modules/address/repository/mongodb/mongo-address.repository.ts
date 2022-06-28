import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AddAddressDto, IAddress } from 'src/modules/address/models';
import { AddressRepository } from '../address.repository';
import { Address, AddressDocument } from '.';

export class MongoAddressRepository extends AddressRepository {
  constructor(@InjectModel(Address.name) private addressModel: Model<AddressDocument>) {
    super();
  }

  addAddress(address: AddAddressDto): Promise<string> {
    const newAddress = new this.addressModel(address);
    return newAddress.save().then(({ _id }) => _id.toString());
  }

  getAddressById(id: string): Promise<IAddress> {
    return this.addressModel.findOne({ id }).exec();
  }

  getAddressesByUserId(userId: string): Promise<IAddress[]> {
    return this.addressModel
      .find({ userId: userId })
      .exec()
      .then((addresses) => addresses.map((address) => Object.assign(address, { id: address._id.toString() })));
  }
}
