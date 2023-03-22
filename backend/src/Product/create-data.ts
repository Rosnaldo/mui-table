import { IProduct } from './product.entity';

export const createData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
): Omit<IProduct, 'id'> => ({
  name,
  calories,
  fat,
  carbs,
  protein,
});
