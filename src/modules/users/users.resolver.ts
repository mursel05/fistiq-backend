import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  update(@Args('id') id: number, @Args('input') body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }
}
