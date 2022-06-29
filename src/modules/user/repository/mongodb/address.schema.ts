import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { IAddress } from 'src/modules/user/models';

export type UserDocument = Address & Document & { id: string };

@Schema()
export class Address implements IAddress {
  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop()
  houseNumber: number;

  @Prop()
  pavilion?: number;

  @Prop()
  flatNumber: number;

  @Prop()
  mailIndex: number;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
