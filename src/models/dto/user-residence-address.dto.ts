import { IsInt, IsOptional, IsString } from 'class-validator';

export class UserResidenceAddressDto {
  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsInt()
  houseNumber: number;

  @IsInt()
  @IsOptional()
  pavilion?: number;

  @IsInt()
  @IsOptional()
  apartmentNumber?: number;
}
