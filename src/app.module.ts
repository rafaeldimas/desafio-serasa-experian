import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresTypeormConfigFactory } from './config/postgres-typeorm-config.factory';
import { AuthModule } from './modules/auth/auth.module';
import { FarmModule } from './modules/farm/farm.module';
import { GrowerModule } from './modules/grower/grower.module';
import { HarvestModule } from './modules/harvest/harvest.module';
import { UserModule } from './modules/user/user.module';

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
    UserModule,
    AuthModule,
    GrowerModule,
    FarmModule,
    HarvestModule,
  ],
})
export class AppModule {}
