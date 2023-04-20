import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user/user';
import { Creditor } from '../creditor/entities/creditor/creditor';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateCreditorDto } from '../creditor/dto/create-creditor.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Creditor)
    private readonly creditorRepository: Repository<Creditor>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user); // Save the user to the database and get the saved user object

    console.log(savedUser, 'user'); // Log the saved user object

    // Loop through the creditors array and save each creditor to the database
    for (const creditor of savedUser.creditors) {
      console.log(creditor, 'creditor'); // Log the creditor object

      const cid = creditor.id;
      const existingCreditor = await this.creditorRepository.findOneBy({
        id: cid,
      });

      if (!existingCreditor) {
        await this.creditorRepository.save(creditor);
      }

      console.log(existingCreditor, 'existingCreditor');
    }

    return savedUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  //createCreditor

  async createCreditorForUser(
    id: number,
    createCreditorDto: CreateCreditorDto
  ): Promise<void> {
    // Find the user by ID
    const user = await this.userRepository.findOneBy({ id });

    console.log(user, 'us');

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Create a new creditor entity and set its properties
    const creditor = new Creditor();
    creditor.name = createCreditorDto.name;
    creditor.address = createCreditorDto.address;
    creditor.email = createCreditorDto.email;
    creditor.phone = createCreditorDto.phone;
    creditor.amount_owned = createCreditorDto.amount_owned;
    creditor.user = user;

    console.log(creditor, 'red');

    // Save the new creditor to the database
    await this.creditorRepository.save(creditor);

    if (!user.creditors) {
      user.creditors = [];
    }

    if (user.creditors.length === 0) {
      user.creditors = [];
    }

    // Push the new creditor to the user's creditors array
    user.creditors.push(creditor);

    // Save the updated user to the database
    await this.userRepository.save(user);
  }
}
