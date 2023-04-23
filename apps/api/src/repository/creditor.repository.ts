import { EntityRepository, Repository } from 'typeorm';
import { Creditor } from '../entity/creditor.entity';

@EntityRepository(Creditor)
export class CreditorRepository extends Repository<Creditor> {
  // Custom repository methods for creditor entity
}
