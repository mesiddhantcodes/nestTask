import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);

    }
    @Post('/login')
    login(@Body('username') username: string, @Body('password') password: string) {
        return this.authService.login(username, password);
    }
}