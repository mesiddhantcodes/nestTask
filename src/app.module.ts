import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { Auth } from './auth/entity/auth.entity';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.local.env' })],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRE_HOST'),
        port: configService.get<number>('POSTGRE_PORT'),
        username: configService.get('POSTGRE_USER'),
        password: configService.get<string>('POSTGRE_PASSWORD'),
        database: configService.get('POSTGRE_DB'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  AuthModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
