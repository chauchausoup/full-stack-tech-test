import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  UserCreditorDto,
  UserWithCreditorsDto,
} from 'src/dto/user-with-creditors.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email address already exists',
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get uers' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: User,
    isArray: true,
  })
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Put(':id/creditor')
  async updateUserCreditors(
    @Param('id') userId: number,
    @Body()
    userCreditorDto: UserCreditorDto
  ): Promise<UserWithCreditorsDto> {
    return this.userService.updateUserCreditors(userId, userCreditorDto);
  }
}
