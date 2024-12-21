import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { BmiService } from './bmi.service';
import { JwtAuthGuard } from '../configuration/jwt-auth.guard';
import { Bmi } from '../schema/bmi.schema';

@Controller('bmi')
export class BmiController {
  constructor(private readonly bmiService: BmiService) {}

  // Lưu dữ liệu BMI
@UseGuards(JwtAuthGuard)
@Post('save')
async saveBmiData(
  @Req() req, // Lấy user từ request
  @Body() bmiData: { Weigh: number; Height: number; BMI: number }, // Sử dụng kiểu number thay vì Number
): Promise<Bmi> {
  console.log('Received data:', bmiData); 
  const userID = req.user._id; // Lấy userID từ request

  // Gọi service để lưu hoặc cập nhật dữ liệu BMI
  return this.bmiService.saveBmiData(
    userID,
    bmiData.Weigh,
    bmiData.Height,
    bmiData.BMI,
  );
}

  // Lấy tất cả thông tin BMI của người dùng
  @UseGuards(JwtAuthGuard)
  @Get()
  async getBmiData(@Req() req): Promise<Bmi[]> {
    const userID = req.user._id; // Lấy userID từ request
    return await this.bmiService.getBmiData(userID);
  }

  // Lấy dữ liệu BMI của người dùng trong ngày hiện tại
  @UseGuards(JwtAuthGuard)
  @Get('today')
  async getBmiDataForToday(@Req() req): Promise<Bmi[]> {
    const userID = req.user._id; // Lấy userID từ request
    return await this.bmiService.getBmiDataForToday(userID);
  }
}
