import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AccountService } from './account.service';
import { UserResolver } from './users.resolver';
import { AccountResolver } from './account.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AccountService, UserResolver, AccountResolver],
  exports: [UsersService],
})
export class UsersModule {}
