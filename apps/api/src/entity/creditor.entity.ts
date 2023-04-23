import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserCreditor } from './user-creditor.entity';

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

  @OneToMany(() => UserCreditor, (userCreditor) => userCreditor.creditor, {
    nullable: true,
  })
  userCreditors?: UserCreditor[];
}
