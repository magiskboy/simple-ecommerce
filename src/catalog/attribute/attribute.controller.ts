import { Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  AttributeService,
  SetableAttributeProperties,
} from './attribute.service';
import { Roles } from 'auth/roles.decorator';
import { Response } from 'platform/http';
import AttributeEntity from './attribute.entity';
import { getPaginationParamsFromRequest } from 'utils';

@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @Roles('Admin', 'Employee')
  async create(
    @Body() data: SetableAttributeProperties,
  ): Promise<Response<AttributeEntity>> {
    const entity = await this.attributeService.create(data);
    return { data: entity };
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  @Roles('Admin', 'Employee')
  async update(
    @Param('id') id: number,
    @Body() data: SetableAttributeProperties,
  ): Promise<Response<AttributeEntity>> {
    const entity = await this.attributeService.update(id, data);
    return { data: entity };
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async list(
    @Req() request: Request,
  ): Promise<PaginationReturnValue<AttributeEntity>> {
    const pagination = getPaginationParamsFromRequest(request);
    const keyword = request.query.keyword as string;
    return await this.attributeService.list({ keyword }, pagination);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  @Roles('Admin', 'Employee')
  async delete(id: number): Promise<Response<AttributeEntity>> {
    const entity = await this.attributeService.delete(id);
    return { data: entity };
  }
}
