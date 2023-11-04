import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { Response } from 'platform/http';
import { UsersService } from './users.service';
import UserEntity from './user.entity';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/')
  @HttpCode(201)
  async signUp(@Body() data: CreateUserDto): Promise<Response<UserEntity>> {
    try {
      const entity = await this.userService.createUser(data);
      return {
        data: entity,
        message: 'Sign up successfully',
      };
    } catch {
      return {
        name: 'SIGNUP_FAILED',
      };
    }
  }
}
