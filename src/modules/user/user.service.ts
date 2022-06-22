import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { EnvVariable } from 'src/models';
import { AddUserDto, IUser } from 'src/modules/user/models';
import { UserRepository } from 'src/modules/user/repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private configService: ConfigService) {}

  async addUser(userInfo: AddUserDto): Promise<string> {
    const hashedPassword = await this.hashPassword(userInfo.password);
    return this.userRepository.addUser({ ...userInfo, password: hashedPassword });
  }

  getUserById(id: string): Promise<IUser> {
    return this.userRepository.getUserById(id);
  }

  getUserByEmail(email: string): Promise<IUser> {
    return this.userRepository.getUserByEmail(email);
  }

  comparePasswordWithOriginal(originalPassword: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, originalPassword);
  }

  async checkUserExistence(id: string, email: string): Promise<boolean> {
    const user = await this.userRepository.getUserById(id);

    return user && user.email === email;
  }

  private hashPassword(originalPassword: string): Promise<string> {
    return bcrypt.hash(originalPassword, this.configService.get<string>(EnvVariable.HASH_ROUNDS));
  }
}
