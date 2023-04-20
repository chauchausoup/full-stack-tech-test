import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCreditorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  amount_owned: number;
}
