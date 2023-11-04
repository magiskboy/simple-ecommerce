import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import type { DatabaseConfig, EnvType } from './configuration';
import UserEntity from 'users/user.entity';
import AttributeSetEntity from 'catalog/attribute-set/attribute-set.entity';
import AttributeSetAttributeEntity from 'catalog/attribute-set/attribute-set-attribute.entity';
import AttributeEntity from 'catalog/attribute/attribute.entity';
import ProductEntity from 'catalog/product/product.entity';
import ProductAttributeEntity from 'catalog/product/product-attribute.entity';
import CategoryEntity from 'catalog/category/category.entity';
import BrandEntity from 'catalog/brand/brand.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { type, host, port, username, password, name } =
      this.configService.get<DatabaseConfig>('database');
    const env = this.configService.get<EnvType>('env');

    return {
      type,
      host,
      port,
      username,
      password,
      database: name,
      synchronize: env !== 'production',
      entities: [
        UserEntity,
        AttributeSetEntity,
        AttributeSetAttributeEntity,
        AttributeEntity,
        ProductEntity,
        ProductAttributeEntity,
        CategoryEntity,
        BrandEntity,
      ],
    };
  }
}
