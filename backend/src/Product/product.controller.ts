import {
  Controller,
  Get,
  // CacheInterceptor,
  // UseInterceptors,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { UpdateProductQueueService } from './queue/update-product-queue.service';

@Controller('product')
// @UseInterceptors(CacheInterceptor)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly updateProductQueueService: UpdateProductQueueService,
  ) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Post('populate')
  populateProducts(): Promise<void> {
    return this.productService.populateProducts();
  }

  @Put('batch')
  updateProducts(): Promise<void> {
    return this.productService.updateProducts();
  }

  @Put('batch-queue')
  async updateProductsQueue(): Promise<void> {
    const products = await this.productService.getProducts();
    for await (const product of products) {
      const updated = { ...product, protein: 120 };
      this.updateProductQueueService.publish(updated);
    }
  }
}
