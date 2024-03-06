import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { Auth } from "./entity/auth.entity";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as brcypt from 'bcryptjs';
import { JwtAuthService } from "./jwt/jwt.service";
@Injectable()
export class AuthService {
    constructor(@InjectRepository(Auth) private authRepository: Repository<Auth>, private readonly jwtAuthService: JwtAuthService) { }
    async register(createUserDto: CreateUserDto): Promise<Auth> {
        let auth: Auth = new Auth();

        auth.username = createUserDto.username;
        //implement the bcrypt to hash the password
        auth.password = brcypt.hashSync(createUserDto.password);
        auth.name = createUserDto.name;
        auth.email = createUserDto.email;
        auth.phone = createUserDto.phone;
        auth.role = createUserDto.role;
        return this.authRepository.save(auth);

    }
    async login(username: string, password: string): Promise<{ user: Auth } | { error: string }> {
        const ifUserExist = await this.authRepository.findOne({ where: { username: username } });
        if (!ifUserExist) {
            return { error: "User not found" };
        }
        const isPasswordMatch = await brcypt.compare(password, ifUserExist.password);

        if (isPasswordMatch) {
            // implement the jwtAuthService to generate token
            const token = await this.jwtAuthService.generateToken(ifUserExist);
            console.log(token)

            return { user: ifUserExist }
        }
        else {
            return { error: "Invalid password" };
        }

    }

}