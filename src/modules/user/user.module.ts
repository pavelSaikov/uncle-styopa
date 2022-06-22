import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoUserRepository, User, UserRepository, UserSchema } from './repository';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [{ provide: UserRepository, useClass: MongoUserRepository }, UserService],
})
export class UserModule {}
