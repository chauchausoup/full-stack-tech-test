import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from '../entity/user.entity';
import { UserService } from './user.service';
import { UserRepository } from 'src/repository/user.repository';
// import { UserWithCreditorsDto } from 'src/dto/user-with-creditors.dto';
import { CreditorRepository } from 'src/repository/creditor.repository';
import { UserCreditorRepository } from 'src/repository/user-creditor.repository';
import { UserCreditor } from 'src/entity/user-creditor.entity';
import { Creditor } from 'src/entity/creditor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserCreditor, Creditor])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
