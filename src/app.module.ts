import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresTypeormConfigFactory } from './config/postgres-typeorm-config.factory';
import { GrowerModule } from './modules/grower/grower.module';
import { FarmModule } from './modules/farm/farm.module';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
