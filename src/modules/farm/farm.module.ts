import { Module } from '@nestjs/common';

import { FarmController } from '@/modules/farm/farm.controller';
import { FarmService } from '@/modules/farm/farm.service';

@Module({
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule {}
