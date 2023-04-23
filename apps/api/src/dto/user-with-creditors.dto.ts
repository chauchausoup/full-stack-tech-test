export class CreditorDto {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
}

export class UserCreditorDto {
  id: number;
  creditor: CreditorDto;
  amount_owned: number;
}

export class UserWithCreditorsDto {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  userCreditors: UserCreditorDto[];
}
