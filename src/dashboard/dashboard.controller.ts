/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  async getStats() {
    return this.dashboardService.getStats();
  }

  @Get('recent-deeds')
  async getRecentDeeds() {
    return this.dashboardService.getRecentDeeds();
  }

  @Get('encumbrances')
  async getEncumbrances() {
    return this.dashboardService.getEncumbrances();
  }

  @Get('recent-activity')
  async getRecentActivity() {
    return this.dashboardService.getRecentActivity();
  }
}
