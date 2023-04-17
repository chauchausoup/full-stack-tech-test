import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creditor } from './entities/creditor/creditor';
import { CreditorController } from './creditor.controller';
import { CreditorService } from './creditor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Creditor])],
  controllers: [CreditorController],
  providers: [CreditorService],
})
export class CreditorModule {}
