import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Farm } from '@/modules/farm/entities/farm.entity';
import { FarmController } from '@/modules/farm/farm.controller';
import { FarmService } from '@/modules/farm/farm.service';
import { TotalAreaIsGreaterOrEqualThanValidator } from '@/modules/farm/validators/total-area.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Farm])],
  controllers: [FarmController],
  providers: [FarmService, TotalAreaIsGreaterOrEqualThanValidator],
})
export class FarmModule {}
