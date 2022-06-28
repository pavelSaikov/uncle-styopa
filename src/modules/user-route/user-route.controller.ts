import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { Serialize } from 'src/interceptors';
import { JwtAuthGuard } from 'src/modules/auth';
import { AddUserDto, UserDto } from 'src/modules/user/models';
import { UserService } from 'src/modules/user';

@Controller('/user')
export class UserRouteController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
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
