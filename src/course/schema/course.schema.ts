import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ required: true })
  coursename: string;

  @Prop({ required: true })
  coursedescription: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  courseinstructor: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
