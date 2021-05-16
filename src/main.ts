import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const logger: LoggerService = new LoggerService();

  app.enableCors();

  logger.verbose(
    `Application listening on port => ${configService.get('port')}`,
  );

  logger.verbose(`SMTP Host => ${configService.get('smtp.host')}`);
  logger.verbose(`SMTP Port => ${configService.get('smtp.port')}`);

  const options = new DocumentBuilder()
    .setTitle('Email Spoofing')
    .setDescription(
      'Email Spoofing API - Educational Purposes ONLY - Do not use this for any other purposes',
    )
    .setVersion('3.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-ui', app, document);

  await app.listen(configService.get('port'));
}

bootstrap();
