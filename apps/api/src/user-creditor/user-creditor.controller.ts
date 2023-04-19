import { Controller, Get } from '@nestjs/common';
import { UserCreditorService } from './user-creditor.service';

@Controller('user-creditor')
export class UserCreditorController {
  constructor(private readonly userCreditorService: UserCreditorService) {}

  @Get()
  async getUsersWithCreditors() {
    return this.userCreditorService.getUsersWithCreditors();
  }
}
