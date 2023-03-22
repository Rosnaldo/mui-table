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

@Controller('product')
// @UseInterceptors(CacheInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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
}
