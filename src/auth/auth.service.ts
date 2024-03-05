import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { Auth } from "./entity/auth.entity";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class AuthService {
    constructor(@InjectRepository(Auth) private authRepository: Repository<Auth>) { }
    register(createUserDto: CreateUserDto): Promise<Auth> {
        let auth: Auth = new Auth();

        auth.username = createUserDto.username;
        auth.password = createUserDto.password;
        auth.name = createUserDto.name;
        auth.email = createUserDto.email;
        auth.phone = createUserDto.phone;
        auth.role = createUserDto.role;
        return this.authRepository.save(auth);

    }

    async login(username: string, password: string): Promise<Auth> {
        const ifUserExist = await this.authRepository.findOne({ where: { username: username } });
        if (ifUserExist) {
            if (ifUserExist.password === password) {
                return ifUserExist;
            }
        }
        return null;
    }

}