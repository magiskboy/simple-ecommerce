import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { BaseModel } from 'platform/database';
import AttributeEntity from 'catalog/attribute/attribute.entity';
import AttributeSetEntity from 'catalog/attribute-set/attribute-set.entity';

@Entity({ name: 'attribute_set_attribute' })
export default class AttributeSetAttribute extends BaseModel {
  @ManyToOne(
    () => AttributeSetEntity,
    (attributeSet) => attributeSet.attributeSetAttributes,
  )
  attributeSet: Relation<AttributeSetEntity>;

  @ManyToOne(
    () => AttributeEntity,
    (attribute) => attribute.attributeSetAttributes,
  )
  attribute: Relation<AttributeEntity>;

  @Column('boolean', { default: false })
  isRequired?: boolean;

  @Column('boolean', { default: false })
  filterable: boolean;
}
