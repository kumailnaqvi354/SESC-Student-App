import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  DOB: string;

  @Prop([String]) // Define an array property
  courses: string[]; // Define the type of the array elements

}

export const StudentSchema = SchemaFactory.createForClass(Student);