import { BadRequestException, Injectable } from '@nestjs/common';
import AttributeEntity from './attribute.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { getPaginationParams } from 'utils';

export type SetableAttributeProperties = Pick<AttributeEntity, 'type' | 'name'>;

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(AttributeEntity)
    private readonly attributeRepository: Repository<AttributeEntity>,
  ) {}

  async create(data: SetableAttributeProperties): Promise<AttributeEntity> {
    const entity = this.attributeRepository.create(data);
    return await this.attributeRepository.save(entity);
  }

  async update(
    id: number,
    data: SetableAttributeProperties,
  ): Promise<AttributeEntity> {
    await this.attributeRepository.update({ id }, data);
    return await this.attributeRepository.findOneBy({ id });
  }

  async list(
    params?: { keyword: string },
    pagination?: PaginationParams,
  ): Promise<PaginationReturnValue<AttributeEntity>> {
    const { page, perPage, sortBy, sortType } = getPaginationParams(pagination);
    const where: FindOptionsWhere<AttributeEntity> = {};

    if (params?.keyword) {
      where.name = ILike(params.keyword);
    }

    const [entities, total] = await this.attributeRepository.findAndCount({
      where,
      take: perPage,
      skip: perPage * page,
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

  async delete(id: number): Promise<AttributeEntity> {
    const entity = await this.attributeRepository.findOne({
      where: { id },
      relations: ['productAttributes'],
    });
    if (entity.productAttributes.length > 0) {
      throw new BadRequestException(
        undefined,
        'Attribute is being used by products',
      );
    }
    await this.attributeRepository.delete({ id });
    return entity;
  }
}
