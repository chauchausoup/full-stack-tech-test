import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../../../user/entities/user/user';
import { UserCreditor } from '../../../user-creditor/user-creditor.entity';

@Entity()
export class Creditor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  // Define many-to-many relationship with User entity through UserCreditor entity
  @ManyToMany(() => User, (user) => user.creditors, { cascade: true })
  @JoinTable()
  users: User[];

  // Define one-to-many relationship with UserCreditor entity
  @OneToMany(() => UserCreditor, (userCreditor) => userCreditor.creditor)
  userCreditors: UserCreditor[];
}
