import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseModel } from 'platform/database';
import AttributeSetAttributeEntity from 'catalog/attribute-set/attribute-set-attribute.entity';

@Entity({ name: 'attribute_sets' })
export default class AttributeSet extends BaseModel {
  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @OneToMany(() => AttributeSetAttributeEntity, (entity) => entity.attributeSet)
  attributeSetAttributes: Relation<AttributeSetAttributeEntity[]>;
}
