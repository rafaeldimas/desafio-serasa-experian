import { Module } from '@nestjs/common';

import { HarvestController } from '@/modules/harvest/harvest.controller';
import { HarvestService } from '@/modules/harvest/harvest.service';

@Module({
  controllers: [HarvestController],
  providers: [HarvestService],
})
export class HarvestModule {}
