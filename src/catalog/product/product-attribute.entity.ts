import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { BaseModel } from 'platform/database';
import ProductEntity from 'catalog/product/product.entity';
import AttributeEntity from 'catalog/attribute/attribute.entity';

@Entity({ name: 'product_attribute' })
export default class ProductAttribute extends BaseModel {
  @ManyToOne(() => ProductEntity, (product) => product.productAttributes)
  product: Relation<ProductEntity>;

  @ManyToOne(() => AttributeEntity, (attr) => attr.productAttributes)
  attribute: Relation<AttributeEntity>;

  @Column('varchar', { nullable: false })
  value: string;

  @Column('boolean', { default: false })
  isRequired: boolean;

  @Column('boolean', { default: false })
  filterable: boolean;
}
