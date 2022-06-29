import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { AddUserDto } from 'src/modules/user/models';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class CheckUserExistencePipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(value: AddUserDto) {
    const email = value.email;

    const isUserExists = await this.userService.checkUserExistenceByEmail(email);

    if (isUserExists) {
      throw new BadRequestException('User with this email already exists');
    }

    return value;
  }
}
