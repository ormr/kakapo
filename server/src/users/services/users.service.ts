import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import LocalFilesService from 'src/localFiles/services/localFiles.service';
import { LocalFileDto } from 'src/localFiles/dto/localFile.dto';
import User from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private localFilesService: LocalFilesService
  ) {}

  async create(createUserInput: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.save(createUserInput);
    return newUser;
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND
    );
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exists',
      HttpStatus.NOT_FOUND
    );
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(id: string, updateUserInput: UpdateUserDto): Promise<User> {
    await this.userRepository.update({ id }, { ...updateUserInput });
    return this.getById(id);
  }

  async removeUser(id: string): Promise<string> {
    await this.userRepository.delete({ id });
    return id;
  }

  async addAvatar(userId: string, fileData: LocalFileDto) {
    const avatar = await this.localFilesService.saveLocalFileData(fileData);
    console.log(avatar);
    await this.userRepository.update(userId, {
      avatarId: avatar.id,
    });
  }
}
