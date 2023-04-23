import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {
  UserCreditorDto,
  UserWithCreditorsDto,
} from 'src/dto/user-with-creditors.dto';

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

  // @Put(':id/creditor')
  // async updateUserCreditor(
  //   @Param('id') userId: number,
  //   @Body() userCreditorDto: UserCreditorDto,
  // ): Promise<UserWithCreditorsDto> {
  //   // Update user-creditor relationship based on provided user ID
  //   const updatedUser = await this.userService.updateUserCreditor(
  //     userId,
  //     userCreditorDto,
  //   );

  //   // Map updated user to UserWithCreditorsDto and return
  //   return {
  //     id: updatedUser.id,
  //     first_name: updatedUser.first_name,
  //     last_name: updatedUser.last_name,
  //     email: updatedUser.email,
  //     userCreditors: updatedUser.userCreditors.map((userCreditor) => {
  //       return {
  //         id: userCreditor.id,
  //         creditor: {
  //           id: userCreditor.creditor.id,
  //           name: userCreditor.creditor.name,
  //           address: userCreditor.creditor.address,
  //           email: userCreditor.creditor.email,
  //           phone: userCreditor.creditor.phone,
  //         },
  //         amount_owned: userCreditor.amount_owned,
  //       };
  //     }),
  //   };
  // }
}
