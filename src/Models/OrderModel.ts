import { model, Schema } from 'mongoose';
import { IOrder } from '../interfaces/OrderInterface';

const OrderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    product: { type: String, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

const orderModel = model<IOrder>('Order', OrderSchema);
export default orderModel;
