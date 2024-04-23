import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LibraryDocument = HydratedDocument<Library>;

@Schema()
export class Library {
 
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  type: string;
  
  @Prop({ required: true })
  amount: string;

  @Prop({ required: true })
  dueDate: string;

}

export const LibrarySchema = SchemaFactory.createForClass(Library);
