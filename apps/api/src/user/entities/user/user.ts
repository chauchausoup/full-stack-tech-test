import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
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
  @JoinColumn()
  creditors: Creditor[];
}
