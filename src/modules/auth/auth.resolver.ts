import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { MutationResponse } from 'src/common/dto/mutation-response.dto';
import { AuthResponse } from './dto/token-response.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  me(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => AuthResponse)
  register(@Args('input') body: RegisterDto) {
    return this.authService.register(body);
  }

  @Mutation(() => AuthResponse)
  login(@Args('input') body: LoginDto) {
    return this.authService.login(body);
  }

  @Mutation(() => MutationResponse)
  forgotPassword(@Args('input') body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @Mutation(() => MutationResponse)
  resetPassword(@Args('input') body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }

  @Mutation(() => MutationResponse)
  logout(@CurrentUser() user: User) {
    return this.authService.logout(user);
  }

  @Mutation(() => AuthResponse)
  refreshToken(@Args('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }
}
