import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../../user/entities/user/user';

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

  @Column({ nullable: true })
  amount_owned: number;

  @ManyToOne(() => User, (user) => user.creditors)
  user: User;
}
