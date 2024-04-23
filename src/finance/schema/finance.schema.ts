import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FinancetDocument = HydratedDocument<Finance>;

@Schema()
export class Finance {
 
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  hasOutstandingBalance: string;
  @Prop({ required: true })
  outstandingAmount: string;
}

export const FinanceSchema = SchemaFactory.createForClass(Finance);
