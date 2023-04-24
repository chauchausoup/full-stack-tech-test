import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserCreditorService } from './user-creditor.service';
import { UserCreditorController } from './user-creditor.controller';
import { UserService } from 'src/user/user.service';

import { User } from 'src/entity/user.entity';
import { UserCreditor } from 'src/entity/user-creditor.entity';
import { Creditor } from 'src/entity/creditor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCreditor, User, Creditor])],
  providers: [UserCreditorService, UserService],
  controllers: [UserCreditorController],
})
export class UserCreditorModule {}
