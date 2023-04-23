import { Module } from '@nestjs/common';
import { CreditorService } from './creditor.service';
import { CreditorController } from './creditor.controller';
import { Creditor } from 'src/entity/creditor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Creditor])],
  providers: [CreditorService],
  controllers: [CreditorController],
})
export class CreditorModule {}
