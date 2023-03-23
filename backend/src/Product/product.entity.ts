import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import * as R from 'ramda';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'numeric' })
  calories: number;

  @Column({ type: 'numeric' })
  fat: number;

  @Column({ type: 'numeric' })
  carbs: number;

  @Column({ type: 'numeric' })
  protein: number;
}

export type IProduct = Omit<Product, ''>;
