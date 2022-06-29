import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AddUserDto } from 'src/modules/user/models';
import { UserRepository } from '../user.repository';
import { User, UserDocument } from './user.schema';

export class MongoUserRepository extends UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super();
  }

  addUser(user: AddUserDto): Promise<string> {
    const newUser = new this.userModel(user);
    return newUser.save().then(({ _id }) => _id.toString());
  }

  async getUserById(id: string): Promise<UserDocument | undefined> {
    const mongoUser = await this.userModel.findById(id).exec();

    return this.assignIdField(mongoUser);
  }

  async getUserByEmail(email: string): Promise<UserDocument | undefined> {
    const mongoUser = await this.userModel.findOne({ email }).exec();

    return this.assignIdField(mongoUser);
  }

  private assignIdField(mongoUser: Omit<UserDocument, 'id'>) {
    if (!mongoUser) {
      return undefined;
    }

    return Object.assign(mongoUser, { id: mongoUser._id.toString() });
  }
}
