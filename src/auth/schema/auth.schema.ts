import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
 
  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
