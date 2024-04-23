import { PartialType } from '@nestjs/mapped-types';
import { CreateFinanceDto } from './create-finance.dto';

export class UpdateFinanceDto extends PartialType(CreateFinanceDto) {
  studentId: string;
  hasOutstandingBalance: string;
  outstandingAmount: string;
}
