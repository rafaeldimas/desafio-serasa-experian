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

import { CreateHarvestRequest } from '@/modules/harvest/dto/create-harvest.request';
import { HarvestResponse } from '@/modules/harvest/dto/harvest.response';
import { UpdateHarvestRequest } from '@/modules/harvest/dto/update-harvest.request';
import { HarvestMapper } from '@/modules/harvest/harvest.mapper';
import { HarvestService } from '@/modules/harvest/harvest.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('harvest')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post()
  @ApiCreatedResponse({ type: HarvestResponse, description: 'Harvest created' })
  async create(
    @Body() createHarvestDto: CreateHarvestRequest,
  ): Promise<HarvestResponse> {
    const harvest = await this.harvestService.create(createHarvestDto);
    return HarvestMapper.entityToResponse(harvest);
  }

  @Get()
  @ApiOkResponse({ type: Array<HarvestResponse>, description: 'Harvests' })
  async findAll(): Promise<HarvestResponse[]> {
    const harvests = await this.harvestService.findAll();
    return HarvestMapper.entitiesToResponse(harvests);
  }

  @Get(':id')
  @ApiOkResponse({ type: HarvestResponse, description: 'Harvest' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<HarvestResponse> {
    const harvest = await this.harvestService.findOne(id);
    return HarvestMapper.entityToResponse(harvest);
  }

  @Patch(':id')
  @ApiOkResponse({ type: HarvestResponse, description: 'Harvest updated' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateHarvestDto: UpdateHarvestRequest,
  ): Promise<HarvestResponse> {
    const harvest = await this.harvestService.update(id, updateHarvestDto);
    return HarvestMapper.entityToResponse(harvest);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Harvest removed' })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<HarvestResponse> {
    const harvest = await this.harvestService.remove(id);
    return HarvestMapper.entityToResponse(harvest);
  }
}
