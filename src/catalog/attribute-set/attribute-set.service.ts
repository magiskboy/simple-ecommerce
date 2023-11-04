import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AttributeSetEntity from './attribute-set.entity';
import AttributeSetAttributeEntity from './attribute-set-attribute.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { getPaginationParams } from 'utils';

export type SetableAttributeSetProperties = Pick<AttributeSetEntity, 'name'> & {
  attributes?: { id: number; filterable?: boolean; isRequired?: boolean }[];
};

@Injectable()
export class AttributeSetService {
  constructor(
    @InjectRepository(AttributeSetEntity)
    private readonly attributeSetRepository: Repository<AttributeSetEntity>,
    @InjectRepository(AttributeSetAttributeEntity)
    private readonly attrSetAttrRepository: Repository<AttributeSetAttributeEntity>,
  ) {}

  async create(
    data: SetableAttributeSetProperties,
  ): Promise<AttributeSetEntity> {
    const entity = this.attributeSetRepository.create({ name: data.name });
    await this.attributeSetRepository.save(entity, { reload: true });

    if (data.attributes) {
      await this.addAttributesFor(entity, data.attributes);
    }
    return entity;
  }

  async update(
    id: number,
    data: Partial<SetableAttributeSetProperties>,
  ): Promise<AttributeSetEntity> {
    if (data.name) {
      await this.attributeSetRepository.update({ id }, { name: data.name });
    }
    const attrSet = await this.attributeSetRepository.findOne({
      where: { id },
    });

    if (data.attributes) {
      await this.addAttributesFor(attrSet, data.attributes, true);
    }

    return attrSet;
  }

  private async addAttributesFor(
    attrSet: AttributeSetEntity,
    attrs: SetableAttributeSetProperties['attributes'],
    replace: boolean = true,
  ): Promise<void> {
    if (replace) {
      await this.attrSetAttrRepository.delete({
        attributeSet: { id: attrSet.id },
      });
    }

    const attrEntities = attrs.map((attr) =>
      this.attrSetAttrRepository.create({
        attribute: { id: attr.id },
        attributeSet: { id: attrSet.id },
        isRequired: attr.isRequired,
        filterable: attr.filterable,
      }),
    );
    await this.attrSetAttrRepository.save(attrEntities, { reload: true });
  }

  async get(id: number): Promise<AttributeSetEntity> {
    return await this.attributeSetRepository.findOne({
      where: { id },
      relations: ['attributeSetAttributes'],
    });
  }

  async list(
    params?: { keyword?: string },
    pagination?: PaginationParams,
  ): Promise<PaginationReturnValue<AttributeSetEntity>> {
    const { page, perPage, sortBy, sortType } = getPaginationParams(pagination);
    const keyword = params?.keyword;

    const filters: FindOptionsWhere<AttributeSetEntity> = {};
    if (keyword) {
      filters.name = ILike(keyword);
    }

    const [entities, total] = await this.attributeSetRepository.findAndCount({
      where: filters,
      skip: page * perPage,
      take: perPage,

      order: {
        [sortBy]: sortType.toUpperCase(),
      },
    });

    return {
      data: entities,
      pagination: {
        page,
        perPage,
        total,
      },
    };
  }

  async delete(id: number): Promise<AttributeSetEntity> {
    const deletedAttributeSet = await this.attributeSetRepository.findOne({
      where: { id },
      relations: ['attributeSetAttributes'],
    });
    await Promise.all([
      this.attributeSetRepository.delete({ id }),
      this.attrSetAttrRepository.delete({ attributeSet: { id } }),
    ]);
    return deletedAttributeSet;
  }
}
