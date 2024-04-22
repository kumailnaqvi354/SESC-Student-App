import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course } from './entities/course.entity';
import { CourseSchema } from './schema/course.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])],

  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
