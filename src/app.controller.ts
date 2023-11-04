import { Controller, Get } from '@nestjs/common';
import { AppService } from 'app.service';
import type { DatabaseConfig } from 'platform/configuration';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): DatabaseConfig {
    return this.appService.getHello();
  }
}
