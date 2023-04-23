import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreditorService } from './creditor.service';
import { CreateCreditorDto } from '../dto/create-creditor.dto';
import { Creditor } from '../entity/creditor.entity';

@Controller('creditors')
export class CreditorController {
  constructor(private readonly creditorService: CreditorService) {}

  @Post()
  async createCreditor(
    @Body() createCreditorDto: CreateCreditorDto
  ): Promise<Creditor> {
    return this.creditorService.createCreditor(createCreditorDto);
  }

  @Get()
  async getCreditors(): Promise<Creditor[]> {
    return this.creditorService.getCreditors();
  }
}
