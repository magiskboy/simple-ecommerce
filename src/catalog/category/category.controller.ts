import {
  Get,
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService, SetableCategoryProperties } from './category.service';
import CategoryEntity from './category.entity';
import { Response } from 'platform/http';
import { Roles } from 'auth/roles.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/')
  @HttpCode(201)
  @Roles('Admin', 'Employee')
  async create(
    @Body() data: SetableCategoryProperties,
  ): Promise<Response<CategoryEntity>> {
    const entity = await this.categoryService.create(data);
    return {
      data: entity,
    };
  }

  @Patch('/:id')
  @HttpCode(202)
  @Roles('Admin', 'Employee')
  async update(
    @Param('id') id: number,
    @Body() data: SetableCategoryProperties,
  ): Promise<Response<CategoryEntity>> {
    const entity = await this.categoryService.update(id, data);
    return {
      data: entity,
    };
  }

  @Get('/')
  @HttpCode(200)
  async list(): Promise<Response<CategoryEntity[]>> {
    const entities = await this.categoryService.list();
    return {
      data: entities,
    };
  }
}
