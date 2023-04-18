import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/entities/user/user';
import { Creditor } from '../creditor/entities/creditor/creditor';

export function UserCreditor() {
  @Entity()
  class UserCreditor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amountOwned: number;

    @ManyToOne(() => User, (user) => user.userCreditors)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Creditor, (creditor) => creditor.userCreditors)
    @JoinColumn({ name: 'creditor_id' })
    creditor: Creditor;
  }

  return UserCreditor;
}
