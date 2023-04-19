import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Creditor } from '../../../creditor/entities/creditor/creditor';
import { UserCreditor } from '../../../user-creditor/user-creditor.entity';

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

  // Define many-to-many relationship with Creditor entity through UserCreditor entity
  @ManyToMany(() => Creditor, (creditor) => creditor.users, { cascade: true })
  @JoinTable()
  creditors: Creditor[];

  // Define one-to-many relationship with UserCreditor entity
  @OneToMany(() => UserCreditor, (userCreditor) => userCreditor.user)
  userCreditors: UserCreditor[];
}
