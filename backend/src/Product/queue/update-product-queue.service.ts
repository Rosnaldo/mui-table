import { Injectable } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { IProduct } from '../product.entity';
import { UpdateProductQueue } from './update-product-queue-tag';
import { ProductService } from '../product.service';

@Injectable()
export class UpdateProductQueueService {
  constructor(
    private readonly productService: ProductService,
    private readonly rmqService: AmqpConnection,
  ) {}

  async publish(updated: IProduct): Promise<void> {
    this.rmqService.publish(
      UpdateProductQueue.exchange,
      UpdateProductQueue.routingKey,
      updated,
    );
  }

  @RabbitSubscribe({
    exchange: UpdateProductQueue.exchange,
    routingKey: UpdateProductQueue.routingKey,
  })
  consumer(product: IProduct) {
    this.productService.updateProduct(product);
  }
}
