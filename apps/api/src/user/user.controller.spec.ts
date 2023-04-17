import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@example.com',
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
      };
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
      };
      const result = { id: 1, ...createUserDto };
      jest.spyOn(service, 'create').mockImplementation(async () => result);

      expect(await controller.create(createUserDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const updateUserDto: UpdateUserDto = {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'janedoe@example.com',
      };
      const result = { id: 1, ...updateUserDto };
      jest.spyOn(service, 'update').mockImplementation(async () => result);

      expect(await controller.update('1', updateUserDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a user by id', async () => {
      const result = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
      };
      jest.spyOn(service, 'remove').mockImplementation(async () => result);

      expect(await controller.remove('1')).toBe(result);
    });
  });
});
