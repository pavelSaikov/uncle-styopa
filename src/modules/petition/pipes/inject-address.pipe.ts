import { BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { AddressService } from 'src/modules/address/address.service';
import { AddAddressDto } from 'src/modules/address/models';
import { AddPetitionDto } from 'src/modules/petition/models';

@Injectable()
export class InjectAddressPipe implements PipeTransform {
  constructor(private addressService: AddressService) {}

  async transform(body: { address: any }) {
    if (body.address.id) {
      const addressId = body.address.id;
      const existingAddress = await this.addressService.getAddressById(addressId);
      if (existingAddress) {
        return plainToClass(AddPetitionDto, { ...body, addressId }, { strategy: 'excludeAll' });
      }

      throw new NotFoundException('Address not found');
    }

    const addressDto = plainToClass(AddAddressDto, body.address);
    const errors = await validate(addressDto);

    if (errors.length) {
      throw new BadRequestException('Incorrect address');
    }

    const addressId = await this.addressService.addAddress(addressDto);

    return plainToClass(AddPetitionDto, { ...body, addressId }, { strategy: 'excludeAll' });
  }
}
