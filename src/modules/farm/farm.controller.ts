import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateFarmRequest } from '@/modules/farm/dto/create-farm.request';
import { FarmResponse } from '@/modules/farm/dto/farm.response';
import { UpdateFarmRequest } from '@/modules/farm/dto/update-farm.request';
import { FarmMapper } from '@/modules/farm/farm.mapper';
import { FarmService } from '@/modules/farm/farm.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('farms')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  @ApiCreatedResponse({ type: FarmResponse, description: 'Farm created' })
  async create(
    @Body() createFarmRequest: CreateFarmRequest,
  ): Promise<FarmResponse> {
    const farm = await this.farmService.create(createFarmRequest);
    return FarmMapper.entityToResponse(farm);
  }

  @Get()
  @ApiOkResponse({ type: Array<FarmResponse>, description: 'Farms' })
  async findAll(): Promise<FarmResponse[]> {
    const farms = await this.farmService.findAll();
    return FarmMapper.entitiesToResponse(farms);
  }

  @Get(':id')
  @ApiOkResponse({ type: FarmResponse, description: 'Farm' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<FarmResponse> {
    const farm = await this.farmService.findOne(id);
    return FarmMapper.entityToResponse(farm);
  }

  @Patch(':id')
  @ApiOkResponse({ type: FarmResponse, description: 'Farm updated' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFarmRequest: UpdateFarmRequest,
  ): Promise<FarmResponse> {
    const farm = await this.farmService.update(id, updateFarmRequest);
    return FarmMapper.entityToResponse(farm);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Farm removed' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<FarmResponse> {
    const farm = await this.farmService.remove(id);
    return FarmMapper.entityToResponse(farm);
  }
}
