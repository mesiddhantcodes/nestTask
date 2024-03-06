import { Body, Controller, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { UpdateUserDto } from "./dto/update-user.dto";

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

    @Put('/update/:name')

    updateUser(@Body(new ValidationPipe()) updateUserDto: UpdateUserDto, @Param('name') username : string) {
        console.log("User", updateUserDto, username);
        // console.log("username",username);
        return this.authService.updateUser(username, updateUserDto);
    }
}