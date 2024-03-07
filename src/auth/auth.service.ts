import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { Auth } from "./entity/auth.entity";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as brcypt from 'bcryptjs';
import { JwtAuthService } from "./jwt/jwt.service";
import { UpdateUserDto } from "./dto/update-user.dto";
@Injectable()
export class AuthService {
    constructor(@InjectRepository(Auth) private authRepository: Repository<Auth>, private readonly jwtAuthService: JwtAuthService) { }
    async register(createUserDto: CreateUserDto): Promise<Auth> {
        try {
            let auth: Auth = new Auth();

            auth.username = createUserDto.username;
            //implement the bcrypt to hash the password
            auth.password = brcypt.hashSync(createUserDto.password);
            auth.name = createUserDto.name;
            auth.email = createUserDto.email;
            auth.phone = createUserDto.phone;
            auth.role = createUserDto.role;
            return this.authRepository.save(auth);
        } catch (error) {
            if (error.code === '23505') { // PostgreSQL unique constraint violation error code
                throw new ConflictException('Username is already taken');
            } else {
                throw error;
            }
        }

    }




    async login(username: string, password: string): Promise<{ user: Auth, token: string } | { error: string }> {
        const ifUserExist = await this.authRepository.findOne({ where: { username: username } });
        if (!ifUserExist) {
            return { error: "User not found" };
        }
        const isPasswordMatch = await brcypt.compare(password, ifUserExist.password);

        if (isPasswordMatch) {
            // implement the jwtAuthService to generate token
            const token = await this.jwtAuthService.generateToken(ifUserExist);
            console.log(token)

            return { user: ifUserExist, token: token }
        }
        else {
            return { error: "Invalid password" };
        }

    }
    
    async updateUser(username: string, updateUserDto: UpdateUserDto): Promise<{ message: string, user: Auth }> {
      
        const user = await this.authRepository.findOneBy({ username: username });
        
        console.log("user", user);
        if (!user) {
            return { message: 'User not found', user: null };
        }
        if (updateUserDto.name) {
            user.name = updateUserDto.name;
        }
        if (updateUserDto.email) {
            user.email = updateUserDto.email;
        }
        if (updateUserDto.phone) {
            user.phone = updateUserDto.phone;
        }
        if (updateUserDto.role) {
            user.role = updateUserDto.role;
        }
        // return the updated user

        await this.authRepository.save(user); // Save the updated user

        return { message: 'User updated successfully', user: user };
    }

}