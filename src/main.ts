import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GeneralConfig, HttpConfig } from 'platform/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const generalConfig = configService.get<GeneralConfig>('general');

  const config = new DocumentBuilder()
    .setTitle(generalConfig.name)
    .setContact(
      generalConfig.contact.name,
      generalConfig.contact.url,
      generalConfig.contact.email,
    )
    .setVersion(generalConfig.version)
    .setDescription(generalConfig.description)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const httpConfig = app.get(ConfigService).get<HttpConfig>('http');
  await app.listen(httpConfig.port, httpConfig.host);
}
bootstrap();
