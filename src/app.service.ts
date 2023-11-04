import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { DatabaseConfig } from 'platform/configuration';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): DatabaseConfig {
    return this.configService.getOrThrow<DatabaseConfig>('database');
  }
}
