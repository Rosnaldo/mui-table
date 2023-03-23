import { RabbitMQModule as NestRabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const Configuration = NestRabbitMQModule.forRootAsync(NestRabbitMQModule, {
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('RABBIT_URL'),
    exchanges: [{ name: 'PRODUCT' }],
  }),
  inject: [ConfigService],
});

@Global()
@Module({
  imports: [Configuration],
  exports: [Configuration],
})
export class RabbitMQModule {}
