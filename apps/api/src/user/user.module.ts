import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreditorRepository } from '../creditor/creditor.repository';
import { Creditor } from '../creditor/entities/creditor/creditor';

@Module({
  imports: [TypeOrmModule.forFeature([User, Creditor])],
  controllers: [UserController],
  providers: [UserService, CreditorRepository],
})
export class UserModule {}
