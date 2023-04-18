import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user/user';
import { Creditor } from '../creditor/entities/creditor/creditor';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateCreditorDto } from '../creditor/dto/create-creditor.dto';
import { UpdateCreditorDto } from '../creditor/dto/update-creditor.dto';

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
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  //createCreditor

  async createCreditor(
    userId: number,
    createCreditorDto: CreateCreditorDto
  ): Promise<Creditor> {
    const user = await this.userRepository.findOneBy(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const creditor = new Creditor();
    creditor.user = user;
    creditor.name = createCreditorDto.name;
    creditor.email = createCreditorDto.email;
    creditor.phone = createCreditorDto.phone;
    creditor.address = createCreditorDto.address;
    creditor.amount = createCreditorDto.amount;

    return this.creditorRepository.save(creditor);
  }

  async updateCreditor(
    creditorId: number,
    updateCreditorDto: UpdateCreditorDto
  ): Promise<Creditor> {
    const creditor = await this.creditorRepository.findOne(creditorId);
    if (!creditor) {
      throw new NotFoundException('Creditor not found');
    }

    creditor.name = updateCreditorDto.name || creditor.name;
    creditor.amount = updateCreditorDto.amount || creditor.amount;

    return this.creditorRepository.save(creditor);
  }

  async deleteCreditor(creditorId: number): Promise<void> {
    const creditor = await this.creditorRepository.findOne(creditorId);
    if (!creditor) {
      throw new NotFoundException('Creditor not found');
    }

    await this.creditorRepository.delete(creditorId);
  }

  async getCreditorsByUserId(userId: number): Promise<Creditor[]> {
    // Find the user by userId and include the creditors relation
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('user.creditors', 'creditor')
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Return the creditors associated with the user
    return user.creditors;
  }
}
