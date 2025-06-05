import { Module } from '@nestjs/common';
import { GrowerService } from './grower.service';
import { GrowerController } from './grower.controller';

@Module({
  controllers: [GrowerController],
  providers: [GrowerService],
})
export class GrowerModule {}
