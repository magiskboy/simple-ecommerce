import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import UserEntity from 'users/user.entity';
import type { AuthConfig } from 'platform/configuration';
import { UsersService } from 'users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async loginUser(
    email: string,
    password: string,
  ): Promise<{ user: UserEntity; token: string }> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException();
    }

    if (!(await this.userService.verifyPassword(user, password))) {
      throw new BadRequestException();
    }

    const token = await this.createAccessTokenFor(user);

    return {
      user,
      token,
    };
  }

  private async createAccessTokenFor(user: UserEntity): Promise<string> {
    const auth = this.configService.get<AuthConfig>('auth');
    const payload = {
      uuid: user.uuid,
      email: user.email,
      roles: user.roles,
    };
    const options = {
      secret: auth.secret,
      algorithms: ['HS256'],
      expiresIn: auth.expiresIn,
    };
    return await this.jwtService.signAsync(payload, options);
  }
}
