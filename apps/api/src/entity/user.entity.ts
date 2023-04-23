import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserCreditor } from './user-creditor.entity';

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

  @OneToMany(() => UserCreditor, (userCreditor) => userCreditor.user)
  @JoinColumn()
  userCreditors: UserCreditor[];
}
