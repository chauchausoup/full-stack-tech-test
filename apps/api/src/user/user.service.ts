import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entity/user.entity';
import { UserCreditor } from 'src/entity/user-creditor.entity';
import { Creditor } from 'src/entity/creditor.entity';

import { CreateUserDto } from '../dto/create-user.dto';
import {
  CreditorDto,
  UserCreditorDto,
  UserWithCreditorsDto,
} from 'src/dto/user-with-creditors.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserCreditor)
    private userCreditorRepository: Repository<UserCreditor>,
    @InjectRepository(Creditor)
    private creditorRepository: Repository<Creditor>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { first_name, last_name, email } = createUserDto;

    // Check if user with the same email already exists
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException('Email address already exists');
    }

    // Create a new user entity
    const newUser = new User();
    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.email = email;

    // Save the new user entity to the database
    return this.userRepository.save(newUser);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['userCreditors'],
    });
  }

  async getUsersWithCreditors(): Promise<UserWithCreditorsDto[]> {
    const users = await this.userRepository.find({
      relations: ['userCreditors', 'userCreditors.creditor'],
    });

    const userWithCreditorsDtoArray: UserWithCreditorsDto[] = [];

    for (const user of users) {
      const userWithCreditorsDto = new UserWithCreditorsDto();
      userWithCreditorsDto.id = user.id;
      userWithCreditorsDto.first_name = user.first_name;
      userWithCreditorsDto.last_name = user.last_name;
      userWithCreditorsDto.email = user.email;

      const userCreditorsDtoArray: UserCreditorDto[] = [];

      for (const userCreditor of user.userCreditors) {
        const creditorDto = new CreditorDto();
        creditorDto.id = userCreditor.creditor.id;
        creditorDto.name = userCreditor.creditor.name;
        creditorDto.address = userCreditor.creditor.address;
        creditorDto.email = userCreditor.creditor.email;
        creditorDto.phone = userCreditor.creditor.phone;

        const userCreditorDto = new UserCreditorDto();
        userCreditorDto.creditor = creditorDto;
        userCreditorDto.amount_owned = userCreditor.amount_owned;
        userCreditorDto.id = userCreditor.id;

        userCreditorsDtoArray.push(userCreditorDto);
      }

      userWithCreditorsDto.userCreditors = userCreditorsDtoArray;
      userWithCreditorsDtoArray.push(userWithCreditorsDto);
    }

    return userWithCreditorsDtoArray;
  }

  async updateUserCreditors(
    userId: number,
    userCreditorDto: UserCreditorDto
  ): Promise<User> {
    const { id, creditor, amount_owned } = userCreditorDto;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userCreditors', 'userCreditors')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!user) {
      // Handle case when user is not found
      throw new Error(`User with ID ${userId} not found`);
    }

    console.log(user, 'incoming user');
    // Find the user-creditor relationship to be updated

    const newCreditor = new UserCreditor();
    newCreditor.id = id;
    newCreditor.creditor = { ...creditor };
    newCreditor.amount_owned = amount_owned;

    this.userCreditorRepository.save({
      id,
      creditor,
      amount_owned,
    });

    await this.userRepository
      .createQueryBuilder('user')
      .relation(User, 'userCreditors')
      .of(userId)
      .add(newCreditor);

    user.userCreditors.push(newCreditor);

    await this.userRepository.save(user);

    const updatedUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userCreditors', 'userCreditors')
      .where('user.id = :userId', { userId })
      .getOne();

    return updatedUser;
  }
}
