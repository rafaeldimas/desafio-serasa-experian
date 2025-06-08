import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresTypeormConfigFactory } from './config/postgres-typeorm-config.factory';
import { FarmModule } from './modules/farm/farm.module';
import { GrowerModule } from './modules/grower/grower.module';
import { HarvestModule } from './modules/harvest/harvest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: PostgresTypeormConfigFactory,
      inject: [ConfigService],
    }),
    GrowerModule,
    FarmModule,
    HarvestModule,
  ],
})
export class AppModule {}
