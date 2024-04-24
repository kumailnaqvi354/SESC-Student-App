import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Model } from 'mongoose';
import { mock } from 'jest'; // Assuming you're using a mocking library like `jest-mock`
import { Student } from 'src/student/schema/student.schema'; // Assuming Student schema path
import *  as bcrypt from "bcrypt";

describe('AuthService', () => {
  let authService: AuthService;
  let studentModel: Model<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'StudentModel',
          useValue: mock({
            find: jest.fn(),
            findOne: jest.fn(),
          }),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    studentModel = module.get<Model<Student>>('StudentModel');
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('create (successful login)', () => {
    it('should return the student object on successful login', async () => {
      const email = 'john.doe@example.com';
      const password = 'secret123';
      const hashedPassword = await bcrypt.hash(password, 10);
      const expectedStudent = new Student({ email, password: hashedPassword });

      // Mock studentModel methods with expected data
      jest.spyOn(studentModel, 'find').mockReturnValueOnce(Promise.resolve([expectedStudent]));
      jest.spyOn(studentModel, 'findOne').mockReturnValueOnce(expectedStudent);
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(true));

      const createAuthDto: CreateAuthDto = { email, password };
      const result = await authService.create(createAuthDto);

      expect(studentModel.find).toHaveBeenCalledWith({ email });
      expect(studentModel.findOne).toHaveBeenCalledWith({ email });
      expect(bcrypt.compare).toHaveBeenCalledWith(createAuthDto.password, expectedStudent.password);
      expect(result).toEqual(expectedStudent);
    });
  });

  describe('create (failed login - email not found)', () => {
    it('should throw an error when student email is not found', async () => {
      const email = 'notfound@example.com';
      const password = 'anypassword';

      // Mock studentModel methods to return no data
      jest.spyOn(studentModel, 'find').mockReturnValueOnce(Promise.resolve([]));

      const createAuthDto: CreateAuthDto = { email, password };

      try {
        await authService.create(createAuthDto);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error.message).toEqual('Student not exists');
      }
    });
  });

  describe('create (failed login - incorrect password)', () => {
    it('should not return a student object on incorrect password', async () => {
      const email = 'john.doe@example.com';
      const password = 'wrongpassword';
      const hashedPassword = await bcrypt.hash('secret123', 10);
      const expectedStudent = new Student({ email, password: hashedPassword });

      // Mock studentModel methods with expected data
      jest.spyOn(studentModel, 'find').mockReturnValueOnce(Promise.resolve([expectedStudent]));
      jest.spyOn(studentModel, 'findOne').mockReturnValueOnce(expectedStudent);
      jest.spyOn(bcrypt.compare, 'mockReturnValueOnce').mockReturnValueOnce(Promise.resolve(false));

      const createAuthDto: CreateAuthDto = { email, password };
      const result = await authService.create(createAuthDto);

      expect(studentModel.find).toHaveBeenCalledWith({ email });
      expect(studentModel.findOne).toHaveBeenCalledWith({ email });
      expect(bcrypt.compare).toHaveBeenCalledWith(createAuthDto.password, expectedStudent.password);
      expect(result).toBeUndefined(); // No student returned on failed login
    });
  });


});
