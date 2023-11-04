import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductEntity from './product.entity';
import { Repository } from 'typeorm';

export type SetableProductProperties = Pick<
  ProductEntity,
  'name' | 'brand' | 'category' | 'images' | 'description'
>;

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(data: SetableProductProperties): Promise<ProductEntity> {
    const entity = this.productRepository.create(data);
    return await this.productRepository.save(entity);
  }

  async update(
    id: number,
    data: SetableProductProperties,
  ): Promise<ProductEntity> {
    await this.productRepository.update({ id }, data);
    return this.productRepository.findOneBy({ id });
  }
}
