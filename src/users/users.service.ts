import * as bcrypt from 'bcrypt';
import { DeepPartial, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from './user.entity';
import { TypeORMError } from 'typeorm/error';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneByUUID(uuid: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ uuid });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  async createUser(data: DeepPartial<UserEntity>): Promise<UserEntity> {
    const salt = await bcrypt.genSalt(1);
    const hashPassword = await bcrypt.hash(data.password, salt);
    const entity = this.userRepository.create({
      ...data,
      password: hashPassword,
      roles: ['Normal'],
      passwordType: 'hash',
    });
    return await this.userRepository.save(entity);
  }

  async verifyPassword(user: UserEntity, password: string): Promise<boolean> {
    if (user.passwordType === 'plain') {
      return user.password === password;
    }

    if (user.passwordType === 'hash') {
      return bcrypt.compare(password, user.password);
    }

    return false;
  }
}
