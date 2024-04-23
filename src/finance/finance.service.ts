import { Injectable } from '@nestjs/common';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { Finance } from './schema/finance.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FinanceService {
  constructor(
    @InjectModel(Finance.name) private financeModel: Model<Finance>,
  ) {}
  create(createFinanceDto: CreateFinanceDto) {
    const financeCreated = new this.financeModel(createFinanceDto)
    return financeCreated.save();
  }

  findAll() {
    return `This action returns all finance`;
  }

  findOne(id: string) {
    return this.financeModel.find({studentId: id});
  }

  update(id: string, updateFinanceDto: UpdateFinanceDto) {
    return this.financeModel.findOneAndUpdate({studentId: id}, updateFinanceDto)
  }

  remove(id: number) {
    return `This action removes a #${id} finance`;
  }
}
