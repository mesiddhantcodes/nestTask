import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { Auth } from './auth/entity/auth.entity';
import { AuthModule } from './auth/auth.module';
// import { JwtAuthService } from './auth/jwt/jwt.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : 'postgres',
      host : 'localhost',
      port : 5432,
      username : 'postgres',
      password : '2002',
      database : 'postgres',
      synchronize : true,
      autoLoadEntities : true,
      logging : true
    }),



    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
