import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Index({ unique: true })
    username: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    role: string;

    // want a token to return 
    // @Column()
    // token: string;
}