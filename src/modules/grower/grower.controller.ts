import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GrowerService } from './grower.service';
import { CreateGrowerDto } from './dto/create-grower.dto';
import { UpdateGrowerDto } from './dto/update-grower.dto';

@Controller('grower')
export class GrowerController {
  constructor(private readonly growerService: GrowerService) {}

  @Post()
  create(@Body() createGrowerDto: CreateGrowerDto) {
    return this.growerService.create(createGrowerDto);
  }

  @Get()
  findAll() {
    return this.growerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.growerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGrowerDto: UpdateGrowerDto) {
    return this.growerService.update(+id, updateGrowerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.growerService.remove(+id);
  }
}
