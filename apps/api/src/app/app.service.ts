import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user/user';
import { Creditor } from '../creditor/entities/creditor/creditor';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Creditor)
    private readonly creditorRepository: Repository<Creditor>
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, user: User): Promise<User> {
    const existingUser = await this.userRepository.findOne(id);
    existingUser.first_name = user.first_name;
    existingUser.last_name = user.last_name;
    existingUser.email = user.email;
    return await this.userRepository.save(existingUser);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getCreditors(): Promise<Creditor[]> {
    return await this.creditorRepository.find();
  }

  async getCreditorById(id: number): Promise<Creditor> {
    return await this.creditorRepository.findOne(id);
  }

  async createCreditor(creditor: Creditor): Promise<Creditor> {
    return await this.creditorRepository.save(creditor);
  }

  async updateCreditor(id: number, creditor: Creditor): Promise<Creditor> {
    const existingCreditor = await this.creditorRepository.findOne(id);
    existingCreditor.name = creditor.name;
    existingCreditor.amount_owed = creditor.amount_owed;
    return await this.creditorRepository.save(existingCreditor);
  }

  async deleteCreditor(id: number): Promise<void> {
    await this.creditorRepository.delete(id);
  }
}
