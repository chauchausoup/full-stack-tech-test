import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user/user';
import { Creditor } from '../creditor/entities/creditor/creditor';
import { UserCreditor } from './user-creditor.entity';
import { CreateUserCreditorDto } from './dto/createUserCreditorDto';

@Injectable()
export class UserCreditorService {
  constructor(
    @InjectRepository(UserCreditor)
    private readonly userCreditorRepository: Repository<UserCreditor>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Creditor)
    private readonly creditorRepository: Repository<Creditor>
  ) {}

  async createUserCreditor(
    userCreditorData: CreateUserCreditorDto
  ): Promise<UserCreditor> {
    const { userId, creditorId, amountOwned } = userCreditorData;

    // Fetch user and creditor entities from their respective repositories
    const user = await this.userRepository.findOne(userId);
    const creditor = await this.creditorRepository.findOne(creditorId);

    // Create a new UserCreditor entity
    const userCreditor = new UserCreditor();
    userCreditor.user = user;
    userCreditor.creditor = creditor;
    userCreditor.amount_owned = amountOwned;

    // Save the new UserCreditor entity to the database
    return this.userCreditorRepository.save(userCreditor);
  }

  async findAll(): Promise<UserCreditor[]> {
    return this.userCreditorRepository.find();
  }

  async findOne(id: number): Promise<UserCreditor> {
    return this.userCreditorRepository.findOneBy({ id });
  }

  async update(
    id: number,
    userCreditorData: UserCreditor
  ): Promise<UserCreditor> {
    // Fetch the user-creditor entity to update
    const userCreditor = await this.userCreditorRepository.findOneBy({ id });

    if (!userCreditor) {
      throw new Error('UserCreditor not found');
    }

    // Update the user-creditor entity with the provided data
    userCreditor.amount_owned = userCreditorData.amount_owned;

    // Save the updated user-creditor entity to the repository
    return this.userCreditorRepository.save(userCreditor);
  }

  async remove(id: number): Promise<void> {
    // Fetch the user-creditor entity to remove
    const userCreditor = await this.userCreditorRepository.findOneBy({ id });

    if (!userCreditor) {
      throw new Error('UserCreditor not found');
    }

    // Remove the user-creditor entity from the repository
    await this.userCreditorRepository.remove(userCreditor);
  }
}
