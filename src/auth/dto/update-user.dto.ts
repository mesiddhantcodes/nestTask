import { IsOptional, IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  role?: string;
}
