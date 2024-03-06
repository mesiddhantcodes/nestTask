import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./entity/auth.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthService } from "./jwt/jwt.service";
import { JwtModule } from "@nestjs/jwt";



@Module({
    imports: [TypeOrmModule.forFeature([Auth]), JwtModule.register({
        secret: "qwertyuiopasdfghjklzxcvbnm1234567890",
        signOptions: {
            expiresIn: "600s"
        }
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthService],
    exports: [AuthService, JwtAuthService]
})
export class AuthModule { }