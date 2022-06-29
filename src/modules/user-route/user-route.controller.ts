import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';

import { Serialize } from 'src/interceptors';
import { JwtAuthGuard } from 'src/modules/auth';
import { UserService } from 'src/modules/user';
import { AddUserDto, UserDto } from 'src/modules/user/models';
import { CheckUserExistencePipe } from './pipes';

@Controller('/user')
export class UserRouteController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UsePipes(CheckUserExistencePipe)
  addUser(@Body() addUserDto: AddUserDto) {
    return this.userService.addUser(addUserDto);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
