import { Injectable } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Library } from './schema/library.schema';
import { Model } from 'mongoose';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<Library>,
  ) {}
  create(createLibraryDto: CreateLibraryDto) {
    const libraryCreated = new this.libraryModel(createLibraryDto);
    return libraryCreated.save();
  }

  findAll() {
    return `This action returns all library`;
  }

  findOne(id: string) {
    return this.libraryModel.find({ studentId: id });
  }

  update(id: string, updateLibraryDto: UpdateLibraryDto) {
    return this.libraryModel.findOneAndUpdate(
      { studentId: id },
      updateLibraryDto,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} library`;
  }
}
