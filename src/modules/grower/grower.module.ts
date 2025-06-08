import { Module } from '@nestjs/common';

import { GrowerController } from '@/modules/grower/grower.controller';
import { GrowerService } from '@/modules/grower/grower.service';

@Module({
  controllers: [GrowerController],
  providers: [GrowerService],
})
export class GrowerModule {}
