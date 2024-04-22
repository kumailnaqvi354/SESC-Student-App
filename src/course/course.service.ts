import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  create(createCourseDto: CreateCourseDto) {
    const courseCreated = new this.courseModel(createCourseDto);
    return courseCreated.save();
  }

  findAll() {
    return this.courseModel.find().exec();
  }

  findOne(id: string) {
    return this.courseModel.findById({ _id: id });
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.findByIdAndUpdate({ _id: id, updateCourseDto });
  }

  remove(id: string) {
    return this.courseModel.findByIdAndDelete({ _id: id });
  }
}
