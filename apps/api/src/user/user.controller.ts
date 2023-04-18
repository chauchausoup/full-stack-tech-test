import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user/user';
import { CreateCreditorDto } from '../creditor/dto/create-creditor.dto';
import { UpdateCreditorDto } from '../creditor/dto/update-creditor.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }

  @Post(':id/creditors')
  async createCreditor(
    @Param('id') userId: number,
    @Body() createCreditorDto: CreateCreditorDto
  ) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userService.createCreditor(userId, createCreditorDto);
  }

  @Patch(':id/creditors/:creditorId')
  async updateCreditor(
    @Param('id') userId: number,
    @Param('creditorId') creditorId: number,
    @Body() updateCreditorDto: UpdateCreditorDto
  ) {
    return this.userService.updateCreditor(creditorId, updateCreditorDto);
  }

  @Delete(':id/creditors/:creditorId')
  async deleteCreditor(
    @Param('id') userId: number,
    @Param('creditorId') creditorId: number
  ) {
    return this.userService.deleteCreditor(creditorId);
  }
}
