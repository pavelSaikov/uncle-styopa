import { BadRequestException } from '@nestjs/common';
import { Expose, Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { isUndefined } from 'src/utils';

import { IAddress } from './IAdress';

export class AddAddressDto implements Omit<IAddress, 'id' | 'houseNumber' | 'pavilion'> {
  @IsString()
  userId: string;

  @IsString()
  city: string;

  @IsString()
  street: string;

  @Expose({ name: 'houseNumber' })
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  houseNumber: string;

  @IsOptional()
  @Expose({ name: 'pavilion' })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (isUndefined(value)) {
      return undefined;
    }

    if (isNaN(value)) {
      throw new BadRequestException('Pavilion should be a number');
    }

    return value;
  })
  pavilion?: string;
}
