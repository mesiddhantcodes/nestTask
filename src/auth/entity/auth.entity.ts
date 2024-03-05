import { IsEmail, Length, Min, Validate, min } from "class-validator";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
// import { IsStrongPasswordConstraint } from "../validator/auth.validator";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    @Index({ unique: true })
    username: string;

    @Column()
    @Length(8, 20, { message: 'Name must be between 8 and 20 characters    ' })
    name: string;

    @Column()
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
    password: string;

    @Column()
    @IsEmail({},{message: 'Invalid email'})
    email: string;

    @Column()
    @Min(10, { message: 'Phone number must be at least 10 characters' })
    phone: string;

    @Column()
    @Length(3, 20, { message: 'Role must be between 3 and 20 characters' })
    role: string;
}