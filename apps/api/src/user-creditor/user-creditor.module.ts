import { Module } from '@nestjs/common';
import { UserCreditorService } from './user-creditor.service';
import { UserCreditorController } from './user-creditor.controller';
import { User } from 'src/entity/user.entity';
import { UserRepository } from 'src/repository/user.repository';
import { CreditorRepository } from 'src/repository/creditor.repository';
import { UserCreditor } from 'src/entity/user-creditor.entity';
import { Creditor } from 'src/entity/creditor.entity';
import { UserCreditorRepository } from 'src/repository/user-creditor.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserCreditor, User, Creditor])],
  providers: [UserCreditorService, UserService],
  controllers: [UserCreditorController],
})
export class UserCreditorModule {}
