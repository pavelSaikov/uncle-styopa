import { Injectable } from '@nestjs/common';

import { AddAddressDto, IAddress } from 'src/modules/address/models';
import { AddressRepository } from './repository';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepository) {}

  addAddress(address: AddAddressDto): Promise<string> {
    return this.addressRepository.addAddress(address);
  }

  getAddressById(id: string): Promise<IAddress> {
    return this.addressRepository.getAddressById(id);
  }

  getAddressesByUserId(userId: string): Promise<IAddress[]> {
    return this.addressRepository.getAddressesByUserId(userId);
  }
}
