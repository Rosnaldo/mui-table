import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import * as R from 'ramda';

@Entity('product')
export class Product {
  // constructor(data?: Partial<Product>) {
  //   const isNotUndefined = (val: any) => val !== undefined;
  //   const parsedData = R.pickBy(isNotUndefined, data);
  //   Object.assign(this, parsedData);
  // }

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
