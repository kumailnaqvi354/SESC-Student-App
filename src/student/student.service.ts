import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './schema/student.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignInStudentDto } from './dto/sigin-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const hashedPassword = await bcrypt.hash(createStudentDto.password, 10); 
    const createdStudent = new this.studentModel({
      ...createStudentDto,
      password: hashedPassword,
    });
    return createdStudent.save();
  }

  async signIn(signInStudentDto: SignInStudentDto){
    const student = this.studentModel.find({email: signInStudentDto.email});
    if (!student) {
      throw new BadRequestException('Student not exists');
    }else{
      console.log("debug student", student);
      
    }
    
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
