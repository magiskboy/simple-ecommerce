import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from 'platform/configuration';
import { InternalGuard } from './internal.guard';

@Controller('internal')
@UseGuards(InternalGuard)
export class InternalController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/config')
  @HttpCode(200)
  getConfig(): Config {
    return this.configService.get<Config>('$all');
  }
}
