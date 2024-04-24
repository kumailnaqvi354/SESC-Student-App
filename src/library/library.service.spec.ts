import { Test, TestingModule } from '@nestjs/testing';
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { Model } from 'mongoose';
import { mock } from 'jest'; // Assuming you're using a mocking library like `jest-mock`
import { Library } from './schema/library.schema';
import *  as bcrypt from "bcrypt";

describe('LibraryService', () => {
  let libraryService: LibraryService;
  let libraryModel: Model<Library>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibraryService,
        {
          provide: 'LibraryModel',
          useValue: mock({
            create: jest.fn(),
            find: jest.fn(),
            findOneAndUpdate: jest.fn(),
          }),
        },
      ],
    }).compile();

    libraryService = module.get<LibraryService>(LibraryService);
    libraryModel = module.get<Model<Library>>('LibraryModel');
  });

  it('should be defined', () => {
    expect(libraryService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new library item', async () => {
      const createLibraryDto: CreateLibraryDto = {
        studentId: '12345',
        bookName: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
      };
      const createdLibrary = new Library(createLibraryDto);

      // Spy on create method and define return value
      jest.spyOn(libraryModel, 'create').mockReturnValueOnce(Promise.resolve(createdLibrary));

      const result = await libraryService.create(createLibraryDto);

      expect(libraryModel.create).toHaveBeenCalledWith(createLibraryDto);
      expect(result).toEqual(createdLibrary);
    });
  });

  describe('findAll', () => {
    it('should return a placeholder message for findAll', async () => {
      const result = await libraryService.findAll();

      expect(result).toEqual('This action returns all library');
    });
  });

  describe('findOne', () => {
    it('should find a library item by studentId', async () => {
      const studentId = '12345';
      const expectedLibrary = new Library({ studentId, bookName: 'Moby Dick', author: 'Herman Melville' });

      // Spy on find method and define return value
      jest.spyOn(libraryModel, 'find').mockReturnValueOnce(Promise.resolve([expectedLibrary]));

      const result = await libraryService.findOne(studentId);

      expect(libraryModel.find).toHaveBeenCalledWith({ studentId });
      expect(result).toEqual([expectedLibrary]);
    });
  });

  describe('update', () => {
    it('should update a library item by studentId', async () => {
      const studentId = '12345';
      const updateLibraryDto: UpdateLibraryDto = { bookName: 'The Hitchhiker\'s Guide to the Galaxy' };
      const updatedLibrary = new Library({ ...updateLibraryDto, studentId });

      // Spy on findOneAndUpdate method and define return value
      jest.spyOn(libraryModel, 'findOneAndUpdate').mockReturnValueOnce(Promise.resolve(updatedLibrary));

      const result = await libraryService.update(studentId, updateLibraryDto);

      expect(libraryModel.findOneAndUpdate).toHaveBeenCalledWith({ studentId }, updateLibraryDto);
      expect(result).toEqual(updatedLibrary);
    });
  });

  describe('remove', () => {
    it('should return a placeholder message for remove', async () => {
      const result = await libraryService.remove(1); // Assuming it's not implemented yet

      expect(result).toEqual('This action removes a #1 library');
    });
  });
});
