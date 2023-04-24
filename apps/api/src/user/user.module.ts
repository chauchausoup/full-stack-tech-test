import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User } from '../entity/user.entity';
import { UserCreditor } from 'src/entity/user-creditor.entity';
import { Creditor } from 'src/entity/creditor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserCreditor, Creditor])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
