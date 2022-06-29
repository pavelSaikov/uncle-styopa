import { AddUserDto, IUser } from 'src/modules/user/models';

export abstract class UserRepository {
  abstract addUser(user: AddUserDto): Promise<string>;

  abstract getUserById(id: string): Promise<IUser | undefined>;

  abstract getUserByEmail(email: string): Promise<IUser | undefined>;
}
