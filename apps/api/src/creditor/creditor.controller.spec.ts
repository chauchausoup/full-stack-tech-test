import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RepositoryMock } from '@nestjs/typeorm/test/mock-repository';
import { CreditorService } from './creditor.service';
import { Creditor } from './entities/creditor/creditor';
import { CreateCreditorDto } from './dto/create-creditor.dto';

describe('CreditorService', () => {
  let service: CreditorService;
  let repo: RepositoryMock<Creditor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditorService,
        {
          provide: getRepositoryToken(Creditor),
          useValue: new RepositoryMock(),
        },
      ],
    }).compile();

    service = module.get<CreditorService>(CreditorService);
    repo = module.get(getRepositoryToken(Creditor));
  });

  describe('create', () => {
    it('should create a new creditor', async () => {
      const dto: CreateCreditorDto = {
        name: 'Example Creditor',
        address: '123 Main St',
        email: 'example@example.com',
        phone: '555-555-1212',
      };
      const expectedResult = {
        id: 1,
        ...dto,
      };
      repo.create.mockReturnValue(expectedResult);
      repo.save.mockReturnValue(expectedResult);

      const result = await service.create(dto);

      expect(result).toEqual(expectedResult);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(expectedResult);
    });
  });

  // Add more tests for other service methods as needed
});
