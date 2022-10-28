import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { IPetition, PetitionStatus } from 'src/modules/petition/models';

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

  @Prop()
  petitionStatus: PetitionStatus;
}

export const PetitionSchema = SchemaFactory.createForClass(Petition);
