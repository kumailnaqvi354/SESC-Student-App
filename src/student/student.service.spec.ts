import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Model } from 'mongoose';
import { mock } from 'jest'; // Assuming you're using a mocking library like `jest-mock`
import * as bcrypt from "bcrypt"
describe('StudentService', () => {
  let studentService: StudentService;
  let studentModel: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: 'StudentModel',
          useValue: mock({
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
          }),
        },
      ],
    }).compile();

    studentService = module.get<StudentService>(StudentService);
    studentModel = module.get<Model<any>>('StudentModel');
  });

  it('should be defined', () => {
    expect(studentService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new student', async () => {
      const createStudentDto: CreateStudentDto = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        password: 'secret123',
        DOB: '',
        degree: '',
        courses: []
      };
      const hashedPassword = await bcrypt.hash(createStudentDto.password, 10);
      const createdStudent = { ...createStudentDto, password: hashedPassword };

      // Spy on create method and define return value
      jest.spyOn(studentModel, 'create').mockReturnValueOnce(Promise.resolve(createdStudent));

      const result = await studentService.create(createStudentDto);

      expect(studentModel.create).toHaveBeenCalledWith({ ...createStudentDto, password: hashedPassword });
      expect(result).toEqual(createdStudent);
    });
  });

});
