import { Module } from '@nestjs/common';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { I18nModule, HeaderResolver } from 'nestjs-i18n';
import { MongooseModule } from '@nestjs/mongoose';

import databaseConfig from './database/config/database.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import { MongooseConfigService } from './database/mongoose-config.service';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { MailerModule } from './mailer/mailer.module';
import { AllConfigType } from './config/config.type';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, mailConfig],
      envFilePath: ['.env'],
    }),
    // MongoDB (Mongoose) connection
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      imports: [ConfigModule],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => [
            configService.get('app.headerLanguage', { infer: true }),
          ],
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    MailModule,
    MailerModule,
    HomeModule,
  ],
})
export class AppModule {}
