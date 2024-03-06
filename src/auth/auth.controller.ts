import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt/AuthGuard";
@Controller()
export class AuthController {
    
    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);

    }
    // @UseGuards(JwtAuthGuard)
    @Post('/login')
    login(@Body('username') username: string, @Body('password') password: string) {
            console.log('sdfsd')
        return this.authService.login(username, password);
    }
}