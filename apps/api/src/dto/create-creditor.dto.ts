import { IsString, IsEmail } from 'class-validator';

export class CreateCreditorDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}
