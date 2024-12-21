import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bmi } from '../schema/bmi.schema';
import * as moment from 'moment';

@Injectable()
export class BmiService {
  constructor(
    @InjectModel(Bmi.name) private readonly bmiModel: Model<Bmi>,
  ) {}

  async saveBmiData(userID: string, Weigh: number, Height: number, BMI: number): Promise<Bmi> {
    const currentDate = new Date(); // Ngày hiện tại
  
    const existingData = await this.bmiModel.findOne({
      userId: userID,
      createdAt: { 
        $gte: moment().startOf('day').toDate(),
        $lte: moment().endOf('day').toDate(),
      },
    });
  
    if (existingData) {
      // Cập nhật bản ghi hiện có
      existingData.Weigh = Weigh;
      existingData.Height = Height;
      existingData.BMI = BMI;
      return existingData.save();
    } else {
      // Tạo bản ghi mới
      const newBMIdata = new this.bmiModel({
        userId: userID,
        Weigh,
        Height,
        BMI,
        createdAt: currentDate,
      });
      return newBMIdata.save();
    }
  }
  
  
  // Lấy thông tin BMI của người dùng trong ngày hiện tại
  async getBmiDataForToday(userID: string): Promise<Bmi[]> {
    const startOfDay = moment().startOf('day').toDate(); // Lấy thời gian bắt đầu ngày hiện tại
    const endOfDay = moment().endOf('day').toDate(); // Lấy thời gian kết thúc ngày hiện tại

    return this.bmiModel.find({
      userId: userID,
      createdAt: { $gte: startOfDay, $lte: endOfDay }, // Lọc theo thời gian tạo trong ngày hiện tại
    });
  }

  // Lấy thông tin BMI của người dùng
  async getBmiData(userID: string): Promise<Bmi[]> {
    return this.bmiModel.find({ userID });
  }
}
