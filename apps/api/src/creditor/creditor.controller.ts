import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreditorService } from './creditor.service';
import { CreateCreditorDto } from './dto/create-creditor.dto';
import { UpdateCreditorDto } from './dto/update-creditor.dto';
import { Creditor } from './entities/creditor/creditor';

@Controller('creditors')
export class CreditorController {
  constructor(private readonly creditorService: CreditorService) {}

  @Post()
  create(@Body() createCreditorDto: CreateCreditorDto): Promise<Creditor> {
    return this.creditorService.create(createCreditorDto);
  }

  @Get()
  findAll(): Promise<Creditor[]> {
    return this.creditorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Creditor> {
    return this.creditorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCreditorDto: UpdateCreditorDto
  ): Promise<Creditor> {
    return this.creditorService.update(id, updateCreditorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.creditorService.remove(id);
  }
}
