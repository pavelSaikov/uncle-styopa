import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUser, UserService } from 'src/modules/user';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.userService.getUserByEmail(email);
    const isPasswordsEqual = await this.userService.comparePasswordWithOriginal(user.password, password);

    return isPasswordsEqual ? user : null;
  }

  async login(user: IUser) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
