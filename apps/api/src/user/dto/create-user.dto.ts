import { CreateCreditorDto } from '../../creditor/dto/create-creditor.dto';

export class CreateUserDto {
  first_name: string;
  last_name: string;
  email: string;
  creditors: CreateCreditorDto[];
}
