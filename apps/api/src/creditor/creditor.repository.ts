import { EntityRepository, Repository } from 'typeorm';
import { Creditor } from './entities/creditor/creditor';

@EntityRepository(Creditor)
export class CreditorRepository extends Repository<Creditor> {
  // Add custom methods for CRUD operations specific to CreditorEntity, if needed
}
