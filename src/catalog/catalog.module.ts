import { Module } from '@nestjs/common';
import { BrandController } from './brand/brand.controller';
import { BrandService } from './brand/brand.service';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { ProductService } from './product/product.service';
import { AttributeService } from './attribute/attribute.service';
import { AttributeSetService } from './attribute-set/attribute-set.service';
import CategoryListener from './category/category.listener';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeSetController } from './attribute-set/attribute-set.controller';
import { AttributeController } from './attribute/attribute.controller';
import AttributeSetEntity from 'catalog/attribute-set/attribute-set.entity';
import AttributeSetAttributeEntity from 'catalog/attribute-set/attribute-set-attribute.entity';
import AttributeEntity from 'catalog/attribute/attribute.entity';
import ProductEntity from 'catalog/product/product.entity';
import ProductAttributeEntity from 'catalog/product/product-attribute.entity';
import CategoryEntity from 'catalog/category/category.entity';
import BrandEntity from 'catalog/brand/brand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttributeSetEntity,
      AttributeSetAttributeEntity,
      AttributeEntity,
      ProductEntity,
      ProductAttributeEntity,
      CategoryEntity,
      BrandEntity,
    ]),
  ],
  controllers: [
    BrandController,
    CategoryController,
    AttributeSetController,
    AttributeController,
  ],
  providers: [
    BrandService,
    CategoryService,
    CategoryListener,
    ProductService,
    AttributeService,
    AttributeSetService,
  ],
})
export class CatalogModule {}
