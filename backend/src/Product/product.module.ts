import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RabbitMQModule } from 'src/rabbitmq.module';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { UpdateProductQueueService } from './queue/update-product-queue.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), RabbitMQModule],
  providers: [ProductService, UpdateProductQueueService],
  controllers: [ProductController],
  exports: [TypeOrmModule],
})
export class ProductModule {}
