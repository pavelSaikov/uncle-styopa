import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { IPetition } from 'src/modules/petition/models/IPetition';

export type PetitionDocument = Petition & Document & { id: string };

@Schema()
export class Petition implements Omit<IPetition, 'id'> {
  @Prop()
  date: string;

  @Prop()
  addressId: string;

  @Prop()
  photosIds: string[];

  @Prop()
  userId: string;
}

export const PetitionSchema = SchemaFactory.createForClass(Petition);
