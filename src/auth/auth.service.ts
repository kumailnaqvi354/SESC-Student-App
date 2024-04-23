import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from 'src/student/schema/student.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const student = this.studentModel.find({ email: createAuthDto.email });
    if (!student) {
      throw new Error('Student not exists');
    } else {
      const studentPassword = await this.studentModel.findOne({
        email: createAuthDto.email,
      });
      const isValid = await bcrypt.compare(
        createAuthDto.password,
        studentPassword.password,
      );
      if (isValid) {
        console.log('Password is correct');
        return student;
      } else {
        console.log('Password is incorrect');
      }
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
