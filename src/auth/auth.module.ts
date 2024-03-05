import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./entity/auth.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


@Module({
    imports: [TypeOrmModule.forFeature([Auth])],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule { }