import { IsString, MaxLength, MinLength } from 'class-validator';

import { AddUserAddressDto } from '../address';
import { IUser } from './IUser';

export class AddUserDto implements Omit<IUser, 'id' | 'address'> {
  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  secondName: string;

  @IsString()
  patronymic: string;

  address: AddUserAddressDto;
}
