import { Expose } from 'class-transformer';
import { IsArray, IsDateString, IsMongoId, MaxLength, MinLength } from 'class-validator';

import { IPetition } from './IPetition';

export class AddPetitionDto implements Omit<IPetition, 'id'> {
  @Expose()
  @IsArray()
  @MinLength(1)
  @MaxLength(4)
  photosIds: string[];

  @Expose()
  @IsDateString()
  date: string;

  @Expose()
  @IsMongoId()
  userId: string;

  @Expose()
  @IsMongoId()
  addressId: string;
}
