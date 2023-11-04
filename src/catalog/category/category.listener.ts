import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import Category from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class CategoryListener {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  @OnEvent('category.created')
  async handleCategoryCreatedEvent(event: Category) {
    if (event.parent) {
      await this.categoryRepository.update(
        { id: event.parent.id },
        { isLeaf: false },
      );
    }
  }

  @OnEvent('category.updated')
  async handleCategoryUpdatedEvent(event: Category) {
    if (event.parent?.id) {
      const count = await this.categoryRepository.count({
        where: { parent: { id: event.parent.id } },
      });
      await this.categoryRepository.update(
        { id: event.parent.id },
        { isLeaf: count === 0 },
      );
    }
  }
}
