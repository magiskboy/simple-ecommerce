import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { InternalModule } from 'internal/internal.module';
import { AuthModule } from 'auth/auth.module';
import { UsersModule } from 'users/users.module';
import { PlatformModule } from 'platform/platform.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [
    PlatformModule,
    InternalModule,
    AuthModule,
    UsersModule,
    CatalogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
