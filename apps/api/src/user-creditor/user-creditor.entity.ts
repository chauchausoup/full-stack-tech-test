import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/entities/user/user';
import { Creditor } from '../creditor/entities/creditor/creditor';

@Entity()
export class UserCreditor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount_owned: number;

  @ManyToOne(() => User, (user) => user.userCreditors)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Creditor, (creditor) => creditor.userCreditors)
  @JoinColumn({ name: 'creditor_id' })
  creditor: Creditor;
}
