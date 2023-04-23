import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCreditorDto } from '../dto/create-creditor.dto';
import { Creditor } from '../entity/creditor.entity';

@Injectable()
export class CreditorService {
  constructor(
    @InjectRepository(Creditor)
    private readonly creditorRepository: Repository<Creditor>
  ) {}

  async createCreditor(
    createCreditorDto: CreateCreditorDto
  ): Promise<Creditor> {
    const creditor = new Creditor();
    creditor.name = createCreditorDto.name;
    creditor.email = createCreditorDto.email;
    creditor.address = createCreditorDto.address;
    creditor.phone = createCreditorDto.phone;

    return this.creditorRepository.save(creditor);
  }

  async getCreditors(): Promise<Creditor[]> {
    return this.creditorRepository.find();
  }
}
