import { Expose, Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

import { IUser } from './IUser';

export class UserDto implements Omit<IUser, 'password'> {
  @Expose({ name: 'id' })
  @Type(() => String)
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  secondName: string;

  @Expose()
  patronymic: string;

  id: string;
}
