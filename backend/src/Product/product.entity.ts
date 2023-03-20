import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'integer' })
  calories: number;

  @Column({ type: 'integer' })
  fat: number;

  @Column({ type: 'integer' })
  carbs: number;

  @Column({ type: 'integer' })
  protein: number;
}

export type IProduct = Omit<Product, ''>;
