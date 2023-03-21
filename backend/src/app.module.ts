import { CacheModule, CacheStore, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-store';

import { configSchemaValidation } from './config.schema-validation';
import { ProductModule } from './Product/product.module';

const ONE_WEEK = 60 * 60 * 24 * 7;

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configSchemaValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: ['dist/**/*.entity.js'],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const config = {
          store: (await redisStore({
            url: configService.get('REDIS_URL'),
          })) as unknown as CacheStore,
          tls: { rejectUnauthorized: false },
          ttl: ONE_WEEK,
        };

        return config;
      },
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
