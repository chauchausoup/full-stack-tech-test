import { EntityRepository, Repository } from 'typeorm';
import { UserCreditor } from '../entity/user-creditor.entity';

@EntityRepository(UserCreditor)
export class UserCreditorRepository extends Repository<UserCreditor> {
  // Custom repository methods for user-creditor entity
}
