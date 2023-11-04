import { Request } from 'express';
import { getPaginationParamsFromRequest } from 'utils';
import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  Get,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import {
  AttributeSetService,
  SetableAttributeSetProperties,
} from './attribute-set.service';
import AttributeSetEntity from './attribute-set.entity';
import { Response } from 'platform/http';

@Controller('attribute-set')
export class AttributeSetController {
  constructor(private readonly attributeSetService: AttributeSetService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: SetableAttributeSetProperties,
  ): Promise<Response<AttributeSetEntity>> {
    const entity = await this.attributeSetService.create(data);
    return { data: entity };
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async update(
    @Param('id') id: number,
    @Body() data: SetableAttributeSetProperties,
  ): Promise<Response<AttributeSetEntity>> {
    const entity = await this.attributeSetService.update(id, data);
    return { data: entity };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: number): Promise<Response<AttributeSetEntity>> {
    const entity = await this.attributeSetService.get(id);
    return { data: entity };
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async list(
    @Req() req: Request,
  ): Promise<PaginationReturnValue<AttributeSetEntity>> {
    const keyword = req.query.keyword as string;
    const pagination = getPaginationParamsFromRequest(req);
    return await this.attributeSetService.list({ keyword }, pagination);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async delete(@Param('id') id: number): Promise<Response<AttributeSetEntity>> {
    const entity = await this.attributeSetService.delete(id);
    return { data: entity };
  }
}
