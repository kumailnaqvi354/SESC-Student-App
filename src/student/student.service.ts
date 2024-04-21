import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './schema/student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  findAll() {
    return `This action returns all student`;
  }

  findOne(id: string) {
    return this.studentModel.findById({ _id: id });
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentModel.findByIdAndUpdate(id, updateStudentDto);
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
