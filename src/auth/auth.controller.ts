import _ from 'lodash';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginRequestDto } from './auth.dto';
import { Response } from 'platform/http';
import { AuthService } from './auth.service';
import UserEntity from 'users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() data: LoginRequestDto,
  ): Promise<Response<{ token: string; user: Omit<UserEntity, 'id'> }>> {
    const { user, token } = await this.authService.loginUser(
      data.email,
      data.password,
    );
    return {
      data: {
        token,
        user: _.omit(user, ['id']),
      },
    };
  }
}
