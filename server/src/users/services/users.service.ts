import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserInput: CreateUserDto): Promise<User> {
    return await this.userRepository.save({ ...createUserInput });
  }

  async getOneUser(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateUser(id: string, updateUserInput: UpdateUserDto): Promise<User> {
    await this.userRepository.update({ id }, { ...updateUserInput });
    return await this.getOneUser(id);
  }

  async removeUser(id: string): Promise<string> {
    await this.userRepository.delete({ id });
    return id;
  }
}
