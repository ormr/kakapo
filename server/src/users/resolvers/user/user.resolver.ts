import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/user.entity';
import { CreateUserInput } from '../../inputs/create-user.input';
import { UpdateUserInput } from '../../inputs/update-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => User)
  async createUser(
    @Args('createUser') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUser') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.updateUser(updateUserInput);
  }

  @Mutation(() => String)
  async removeUser(@Args('id') id: string): Promise<string> {
    return await this.userService.removeUser(id);
  }

  @Query(() => User)
  async getOneUser(@Args('id') id: string): Promise<User> {
    return await this.userService.getOneUser(id);
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
}
