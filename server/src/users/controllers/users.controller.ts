import { Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string) {
    return this.usersService.getOneUser(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
