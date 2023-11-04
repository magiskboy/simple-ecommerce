import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  email: string;

  @IsEmail()
  @MaxLength(50)
  @MinLength(8)
  password: string;
}
