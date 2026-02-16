import { AccountService } from './account.service';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { MutationResponse } from 'src/common/dto/mutation-response.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Query(() => User, { name: 'getProfile' })
  @UseGuards(AuthGuard)
  getProfile(@CurrentUser() user: User) {
    return this.accountService.getProfile(user.id);
  }

  @Mutation(() => MutationResponse)
  updateProfile(
    @CurrentUser() user: User,
    @Args('input') body: UpdateAccountDto,
  ) {
    return this.accountService.updateProfile(user.id, body);
  }

  @Mutation(() => MutationResponse)
  changePassword(
    @CurrentUser() user: User,
    @Args('input') body: UpdatePasswordDto,
  ) {
    return this.accountService.changePassword(user.id, body);
  }
}
