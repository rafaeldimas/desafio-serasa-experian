import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateFarmRequest } from '@/modules/farm/dto/create-farm.request';
import { FarmResponse } from '@/modules/farm/dto/farm.response';
import { UpdateFarmRequest } from '@/modules/farm/dto/update-farm.request';
import { FarmMapper } from '@/modules/farm/farm.mapper';
import { FarmService } from '@/modules/farm/farm.service';

@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  async create(
    @Body() createFarmRequest: CreateFarmRequest,
  ): Promise<FarmResponse> {
    const farm = await this.farmService.create(createFarmRequest);
    return FarmMapper.entityToResponse(farm);
  }

  @Get()
  async findAll(): Promise<FarmResponse[]> {
    const farms = await this.farmService.findAll();
    return FarmMapper.entitiesToResponse(farms);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FarmResponse> {
    const farm = await this.farmService.findOne(id);
    return FarmMapper.entityToResponse(farm);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFarmRequest: UpdateFarmRequest,
  ): Promise<FarmResponse> {
    const farm = await this.farmService.update(id, updateFarmRequest);
    return FarmMapper.entityToResponse(farm);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<FarmResponse> {
    const farm = await this.farmService.remove(id);
    return FarmMapper.entityToResponse(farm);
  }
}
