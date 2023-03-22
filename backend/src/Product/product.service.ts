import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createData } from './create-data';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async populateProducts(): Promise<void> {
    await this.productRepository
      .createQueryBuilder('p')
      .insert()
      .into(Product)
      .values([
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Donut', 452, 25.0, 51, 4.9),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
        createData('Honeycomb', 408, 3.2, 87, 6.5),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Jelly Bean', 375, 0.0, 94, 0.0),
        createData('KitKat', 518, 26.0, 65, 7.0),
        createData('Lollipop', 392, 0.2, 98, 0.0),
        createData('Marshmallow', 318, 0, 81, 2.0),
        createData('Nougat', 360, 19.0, 9, 37.0),
        createData('Oreo', 437, 18.0, 63, 4.0),
      ])
      .execute();
  }

  async *batch(): AsyncGenerator<Product> {
    const products = await this.productRepository.find();

    do {
      const product: Product = await new Promise((res) => {
        const product = products.pop();
        setTimeout(() => res(product), 4000);
      });
      yield product;
    } while (products.length > 0);
  }

  async updateProducts(): Promise<void> {
    const pages = await this.batch();

    for await (const page of pages) {
      await this.productRepository
        .createQueryBuilder('p')
        .where('id = :id', { id: page.id })
        .update()
        .set({
          protein: 100,
        })
        .execute();
    }
  }
}
