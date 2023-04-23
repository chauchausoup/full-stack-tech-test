import { Test, TestingModule } from '@nestjs/testing';
import { UserCreditorService } from './user-creditor.service';

describe('UserCreditorService', () => {
  let service: UserCreditorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCreditorService],
    }).compile();

    service = module.get<UserCreditorService>(UserCreditorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
