import { Controller, Get } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserWithCreditorsDto } from 'src/dto/user-with-creditors.dto';

@Controller('usersWithCreditors')
export class UserCreditorController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsersWithCreditors(): Promise<UserWithCreditorsDto[]> {
    const users = await this.userService.getUsersWithCreditors();
    return users.map((user) => {
      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        userCreditors: user.userCreditors.map((userCreditor) => {
          return {
            id: userCreditor.id,
            creditor: {
              id: userCreditor.creditor.id,
              name: userCreditor.creditor.name,
              address: userCreditor.creditor.address,
              email: userCreditor.creditor.email,
              phone: userCreditor.creditor.phone,
            },
            amount_owned: userCreditor.amount_owned,
          };
        }),
      };
    });
  }
}
