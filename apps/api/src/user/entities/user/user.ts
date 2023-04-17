import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Creditor } from '../../../creditor/entities/creditor/creditor';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @OneToMany(() => Creditor, (creditor) => creditor.user)
  creditors: Creditor[];

  constructor(first_name: string, last_name: string, email: string) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }
}
