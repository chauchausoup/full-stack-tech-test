import { Test, TestingModule } from '@nestjs/testing';
import { UserCreditorController } from './user-creditor.controller';

describe('UserCreditorController', () => {
  let controller: UserCreditorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCreditorController],
    }).compile();

    controller = module.get<UserCreditorController>(UserCreditorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
