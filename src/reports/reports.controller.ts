import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { createReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: createReportDto) {
    return this.reportsService.createReport(body);
  }
}
