import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creditor } from './entities/creditor/creditor';
import { CreateCreditorDto } from './dto/create-creditor.dto';
import { UpdateCreditorDto } from './dto/update-creditor.dto';

@Injectable()
export class CreditorService {
  constructor(
    @InjectRepository(Creditor)
    private readonly creditorRepository: Repository<Creditor>
  ) {}

  async create(createCreditorDto: CreateCreditorDto): Promise<Creditor> {
    const creditor = this.creditorRepository.create(createCreditorDto);
    return this.creditorRepository.save(creditor);
  }

  async findAll(): Promise<Creditor[]> {
    return this.creditorRepository.find();
  }

  async findOne(id: number): Promise<Creditor> {
    const creditor = await this.creditorRepository.findOne(id);
    if (!creditor) {
      throw new NotFoundException(`Creditor with ID ${id} not found`);
    }
    return creditor;
  }

  async update(
    id: number,
    updateCreditorDto: UpdateCreditorDto
  ): Promise<Creditor> {
    const creditor = await this.findOne(id);
    const updatedCreditor = Object.assign(creditor, updateCreditorDto);
    return this.creditorRepository.save(updatedCreditor);
  }

  async remove(id: number): Promise<void> {
    const creditor = await this.findOne(id);
    await this.creditorRepository.remove(creditor);
  }
}
