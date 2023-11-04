import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import slugify from 'slugify';
import { BaseModel } from 'platform/database';
import CategoryEntity from 'catalog/category/category.entity';
import BrandEntity from 'catalog/brand/brand.entity';
import UserEntity from 'users/user.entity';
import ProductAttributeEntity from './product-attribute.entity';
import _ from 'lodash';

@Entity({ name: 'products' })
export default class Product extends BaseModel {
  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @ManyToOne(() => CategoryEntity, { cascade: true })
  category: Relation<CategoryEntity>;

  @ManyToOne(() => BrandEntity, { cascade: true })
  brand: Relation<BrandEntity>;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('simple-array', { nullable: true })
  images?: string[];

  @Column('varchar', { nullable: false, unique: true })
  sku: string;

  @Column('varchar', { nullable: false, unique: true })
  slug: string;

  @ManyToOne(() => UserEntity)
  createdBy: Relation<UserEntity>;

  @BeforeInsert()
  setSlug() {
    this.slug = slugify(this.name);
  }

  @BeforeInsert()
  setSku() {
    this.sku = _.random(1000000, 99999999, false).toString();
  }

  @OneToMany(() => ProductAttributeEntity, (entity) => entity.product)
  productAttributes: Relation<ProductAttributeEntity[]>;
}
