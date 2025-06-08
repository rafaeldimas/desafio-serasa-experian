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

import { CreateGrowerRequest } from '@/modules/grower/dto/create-grower.request';
import { GrowerResponse } from '@/modules/grower/dto/grower.response';
import { UpdateGrowerRequest } from '@/modules/grower/dto/update-grower.request';
import { GrowerMapper } from '@/modules/grower/grower.mapper';
import { GrowerService } from '@/modules/grower/grower.service';
import { ApiCreatedResponse, ApiOkResponse, OmitType } from '@nestjs/swagger';

@Controller('grower')
export class GrowerController {
  constructor(private readonly growerService: GrowerService) {}

  @Post()
  @ApiCreatedResponse({ type: GrowerResponse, description: 'Grower created' })
  async create(
    @Body() createGrowerDto: CreateGrowerRequest,
  ): Promise<GrowerResponse> {
    const grower = await this.growerService.create(createGrowerDto);

    return GrowerMapper.entityToResponse(grower);
  }

  @Get()
  @ApiOkResponse({ type: GrowerResponse, description: 'Growers' })
  async findAll(): Promise<GrowerResponse[]> {
    const growers = await this.growerService.findAll();
    return GrowerMapper.entityListToResponseList(growers);
  }

  @Get(':id')
  @ApiOkResponse({ type: GrowerResponse, description: 'Grower' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GrowerResponse> {
    const grower = await this.growerService.findOne(id);
    return GrowerMapper.entityToResponse(grower);
  }

  @Patch(':id')
  @ApiOkResponse({ type: GrowerResponse, description: 'Grower' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGrowerDto: UpdateGrowerRequest,
  ): Promise<GrowerResponse> {
    const grower = await this.growerService.update(id, updateGrowerDto);
    return GrowerMapper.entityToResponse(grower);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: OmitType(GrowerResponse, ['id']),
    description: 'Grower',
  })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GrowerResponse> {
    const grower = await this.growerService.remove(id);
    return GrowerMapper.entityToResponse(grower);
  }
}
