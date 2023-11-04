import type { Request } from 'express';
import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Res,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { getPaginationParamsFromRequest } from 'utils';
import BrandEntity from './brand.entity';
import { Response } from 'platform/http';
import { SetableBrandProperties } from './brand.service';
import { Roles } from 'auth/roles.decorator';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('/')
  @HttpCode(200)
  async list(
    @Res() request: Request,
  ): Promise<PaginationReturnValue<BrandEntity>> {
    const params = getPaginationParamsFromRequest(request);
    const keyword = request.query.keyword as string;
    return await this.brandService.list({ keyword }, params);
  }

  @Get('/:id')
  @HttpCode(200)
  async get(@Param('id') id: number): Promise<Response<BrandEntity>> {
    const entity = await this.brandService.get(id);
    if (entity)
      return {
        data: entity,
      };

    throw new NotFoundException();
  }

  @Post('/')
  @HttpCode(201)
  @Roles('Admin', 'Employee')
  async create(
    @Body() data: SetableBrandProperties,
  ): Promise<Response<BrandEntity>> {
    const entity = await this.brandService.create(data);
    return {
      data: entity,
    };
  }

  @Patch('/:id')
  @HttpCode(202)
  @Roles('Admin', 'Employee')
  async update(
    @Param('id') id: number,
    @Body() data: SetableBrandProperties,
  ): Promise<Response<BrandEntity>> {
    const entity = await this.brandService.update(id, data);
    return {
      data: entity,
    };
  }
}
