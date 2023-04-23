import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserCreditor } from 'src/entity/user-creditor.entity';
import { Creditor } from 'src/entity/creditor.entity';
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

    console.log(users, 'userssss');

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

  // async updateUserCreditors(
  //   userId: number,
  //   userWithCreditorsDto: UserWithCreditorsDto,
  // ): Promise<UserWithCreditorsDto> {
  //   // Find the user by userId with relations
  //   const user = await this.userRepository
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect('user.userCreditors', 'userCreditors')
  //     .leftJoinAndSelect('userCreditors.creditor', 'creditor')
  //     .where('user.id = :userId', { userId })
  //     .getOne();

  //   // Update user-creditor relationships
  //   const updatedUserCreditors = await Promise.all(
  //     userWithCreditorsDto.userCreditors.map(
  //       async (userCreditorDto: UserCreditorDto) => {
  //         let userCreditor = user.userCreditors.find(
  //           (uc) => uc.creditor.id === userCreditorDto.creditor.id,
  //         );
  //         if (!userCreditor) {
  //           userCreditor = new UserCreditor();
  //           userCreditor.user = user;
  //           userCreditor.creditor = Object.assign(
  //             new Creditor(),
  //             userCreditorDto.creditor,
  //           );
  //         }
  //         userCreditor.amount_owned = userCreditorDto.amount_owned;
  //         return await this.userCreditorRepository.save(userCreditor);
  //       },
  //     ),
  //   );

  //   user.userCreditors = updatedUserCreditors;

  //   // Save updated user
  //   const updatedUser = await this.userRepository.save(user);

  //   // Return updated user with creditors
  //   return {
  //     id: updatedUser.id,
  //     first_name: updatedUser.first_name,
  //     last_name: updatedUser.last_name,
  //     email: updatedUser.email,
  //     userCreditors: updatedUser.userCreditors.map((uc) => ({
  //       id: uc.id,
  //       creditor: {
  //         id: uc.creditor.id,
  //         name: uc.creditor.name,
  //         address: uc.creditor.address,
  //         email: uc.creditor.email,
  //         phone: uc.creditor.phone,
  //       },
  //       amount_owned: uc.amount_owned,
  //     })),
  //   };
  // }

  async updateUserCreditors(
    userId: number,
    userCreditorDto: UserCreditorDto
  ): Promise<User> {
    const { id, creditor, amount_owned } = userCreditorDto;

    console.log(userCreditorDto, 'user creditor');
    console.log({ id, creditor, amount_owned }, 'damm');

    // Verify that userCreditors array is not empty
    // Fetch the existing user from the database
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

    console.log(newCreditor, 'damm newly creditor');

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

    // Save the updated User entity
    await this.userRepository.save(user);

    const userCreditor = await this.userCreditorRepository.find();

    console.log(userCreditor, 'newly user creditor');
    // const u = await this.userCreditorRepository.find();
    // console.log(u, 'all');
    // console.log(newCreditor, 'new creditor');

    const updatedUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userCreditors', 'userCreditors')
      .where('user.id = :userId', { userId })
      .getOne();

    console.log(updatedUser, 'updated user');

    return updatedUser;
  }
}

// {
//   "id": 1,
//   "creditor": {
//     "id": 1,
//     "name": "string",
//     "address": "string",
//     "email": "string@asd.com",
//     "phone": "123"
//   },
//   "amount_owned": 555
// }
