import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    coursename : string;
    coursedescription : string;
    courseinstructor : string;
}
