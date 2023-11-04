import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import CategoryEntity from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

export type SetableCategoryProperties = Pick<
  CategoryEntity,
  'name' | 'description'
> & {
  parent: { id: number };
};

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(data: SetableCategoryProperties): Promise<CategoryEntity> {
    const entity = this.categoryRepository.create(data);
    const newCategory = await this.categoryRepository.save(entity);
    this.eventEmitter.emit('category.created', newCategory);
    return newCategory;
  }

  async update(
    id: number,
    data: SetableCategoryProperties,
  ): Promise<CategoryEntity> {
    await this.categoryRepository.update({ id }, data);
    const updatedCategory = await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent'],
    });
    this.eventEmitter.emit('category.updated', updatedCategory);
    return updatedCategory;
  }

  async list(): Promise<CategoryEntity[]> {
    const entities = await this.categoryRepository.find({
      relations: ['children', 'parent'],
    });
    return entities;
  }
}
