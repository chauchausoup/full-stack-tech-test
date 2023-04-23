import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Creditor } from './creditor.entity';

@Entity()
export class UserCreditor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userCreditors, { nullable: true })
  user?: User;

  @ManyToOne(() => Creditor, (creditor) => creditor.userCreditors, {
    nullable: true,
  })
  creditor: Creditor;

  @Column()
  amount_owned: number;
}
