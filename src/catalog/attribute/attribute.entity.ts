import { Column, Entity, OneToMany, Relation } from 'typeorm';
import AttributeSetAttributeEntity from 'catalog/attribute-set/attribute-set-attribute.entity';
import ProductAttributeEntity from 'catalog/product/product-attribute.entity';
import { BaseModel } from 'platform/database';

export type AttributeType =
  | 'text'
  | 'number'
  | 'choice'
  | 'multi_choices'
  | 'boolean';

@Entity({ name: 'attributes' })
export default class Attribute extends BaseModel {
  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @Column('varchar', { nullable: false })
  type: AttributeType;

  @OneToMany(() => AttributeSetAttributeEntity, (entity) => entity.attribute)
  attributeSetAttributes: Relation<AttributeSetAttributeEntity[]>;

  @OneToMany(() => ProductAttributeEntity, (entity) => entity.attribute)
  productAttributes: Relation<ProductAttributeEntity[]>;
}
