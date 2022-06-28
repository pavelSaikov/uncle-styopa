import { AddAddressDto, IAddress } from '../models';

export abstract class AddressRepository {
  abstract addAddress(address: AddAddressDto): Promise<string>;

  abstract getAddressById(id: string): Promise<IAddress>;

  abstract getAddressesByUserId(userId: string): Promise<IAddress[]>;
}
