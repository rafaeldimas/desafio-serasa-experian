import { Module } from '@nestjs/common';

import { Harvest } from '@/modules/harvest/entities/harvest.entity';
import { HarvestController } from '@/modules/harvest/harvest.controller';
import { HarvestService } from '@/modules/harvest/harvest.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest])],
  controllers: [HarvestController],
  providers: [HarvestService],
})
export class HarvestModule {}
