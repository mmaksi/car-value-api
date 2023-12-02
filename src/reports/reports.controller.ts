import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { createReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.intercept';
import { ReportDto } from './dtos/report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: createReportDto, @CurrentUser() user: User) {
    return this.reportsService.createReport(body, user);
  }
}
