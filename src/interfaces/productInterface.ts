import { Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  brand: string;
  price: number;
  category:
    | 'Writing'
    | 'Office Subpplies'
    | 'Art Supplies'
    | 'Educational'
    | 'Technology';
  description: string;
  quantity: number;
  inStock: boolean;
}
