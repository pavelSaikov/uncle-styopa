import { IsNumber, IsOptional, IsString } from 'class-validator';

import { IAddress } from './IAddress';

export class AddUserAddressDto implements IAddress {
  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsNumber()
  houseNumber: number;

  @IsOptional()
  @IsNumber()
  pavilion?: number;

  @IsNumber()
  flatNumber: number;

  @IsNumber()
  mailIndex: number;
}
