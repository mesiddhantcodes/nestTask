import { IsEmail, Length, Min, Validate } from "class-validator";
import { IsStrongPasswordConstraint } from "../validator/auth.validator";

export class CreateUserDto {
    
    @Length(8, 20, { message: 'Name must be between 8 and 20 characters    ' })
    username: string;

    @Validate(IsStrongPasswordConstraint)
    password: string;

    // @Length(8, 20, { message: 'Name must be between 8 and 20 characters    ' })
    name: string;

    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    // @Min(9, { message: 'Phone number must be at least 10 characters' })
    phone: string;

    @Length(3, 20, { message: 'Role must be between 3 and 20 characters' })
    role: string;
}