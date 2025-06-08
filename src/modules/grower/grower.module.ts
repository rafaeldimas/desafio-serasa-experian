import { Module } from '@nestjs/common';

import { Grower } from '@/modules/grower/entities/grower.entity';
import { GrowerController } from '@/modules/grower/grower.controller';
import { GrowerService } from '@/modules/grower/grower.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Grower])],
  controllers: [GrowerController],
  providers: [GrowerService],
})
export class GrowerModule {}
