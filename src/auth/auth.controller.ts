import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
    
    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);

    }
    // @UseGuards(JwtAuthGuard)
    @Post('/login')
    login(@Body('username') username: string, @Body('password') password: string) {
            console.log('sdfsd')
        return this.authService.login(username, password);
    }
}