import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { IUser } from 'src/modules/user/models';

export type UserDocument = User & Document & { id: string };

@Schema()
export class User implements Omit<IUser, 'id'> {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  secondName: string;

  @Prop()
  patronymic: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
