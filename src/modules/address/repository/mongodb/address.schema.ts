import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { IAddress } from 'src/modules/address/models';

export type AddressDocument = Address & Document & { id: string };

@Schema()
export class Address implements Omit<IAddress, 'id'> {
  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop()
  houseNumber: number;

  @Prop()
  pavilion?: number;

  @Prop()
  userId: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
