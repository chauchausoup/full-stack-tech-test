import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCreditorController } from './user-creditor.controller';
import { UserCreditorService } from './user-creditor.service';
import { User } from '../user/entities/user/user';
import { Creditor } from '../creditor/entities/creditor/creditor';
import { UserCreditor } from './user-creditor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Creditor, UserCreditor])],
  controllers: [UserCreditorController],
  providers: [UserCreditorService],
})
export class UserCreditorModule {}
