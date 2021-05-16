import { Module } from '@nestjs/common';
import { SenderController } from './sender.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SenderService } from './sender.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('smtp.host'),
          port: configService.get('smtp.port'),
          ignoreTLS: true,
          secure: false,
        },
      }),
    }),
    LoggerModule,
  ],
  controllers: [SenderController],
  providers: [SenderService],
})
export class SenderModule {}
