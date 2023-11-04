import { Injectable } from '@nestjs/common';
import BrandEntity from './brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { getPaginationParams } from 'utils';

export type SetableBrandProperties = Pick<
  BrandEntity,
  'name' | 'photoURL' | 'description'
>;

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  async create(data: SetableBrandProperties): Promise<BrandEntity> {
    const entity = this.brandRepository.create(data);
    return await this.brandRepository.save(entity);
  }

  async update(id: number, data: SetableBrandProperties): Promise<BrandEntity> {
    await this.brandRepository.update({ id }, data);
    return await this.brandRepository.findOneBy({ id });
  }

  async list(
    params?: { keyword?: string },
    pagination?: PaginationParams,
  ): Promise<PaginationReturnValue<BrandEntity>> {
    const where: FindOptionsWhere<BrandEntity> = {};
    if (params?.keyword?.length) {
      where.name = ILike(params.keyword);
      where.description = ILike(params.keyword);
    }

    const { page, perPage, sortBy, sortType } = getPaginationParams(pagination);

    const [entities, total] = await this.brandRepository.findAndCount({
      where,
      skip: page * perPage,
      take: perPage,
      order: {
        [sortBy]: sortType.toUpperCase(),
      },
    });

    return {
      data: entities,
      pagination: {
        perPage,
        page,
        total,
      },
    };
  }

  async get(id: number): Promise<BrandEntity | undefined> {
    return this.brandRepository.findOneBy({ id });
  }
}
