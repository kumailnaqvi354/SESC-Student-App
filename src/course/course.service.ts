import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
   const courseCreated = new this.courseModel(createCourseDto);
   return courseCreated.save();
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: string) {
    return this.courseModel.findById({_id: id});
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
