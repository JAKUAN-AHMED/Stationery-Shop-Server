import { Request, Response } from 'express';
import ProductModel from '../Models/ProductModel';
import orderModel from '../Models/OrderModel';
import { IOrder } from '../interfaces/OrderInterface';

const createOrderIntoDb = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;
    const findProduct: any = await ProductModel.findById(product);
    if (!findProduct) {
      res.status(404).json({ message: 'Product Not Found', success: false });
    }
    if (findProduct.quantity < quantity) {
      res.status(400).json({ message: 'Stock Out', success: false });
    }
    findProduct.quantity -= quantity;
    if (findProduct.quantity === 0) {
      findProduct.inStock = false;
    }
    await findProduct.save();
    const order = await new orderModel({
      email,
      product,
      quantity,
      totalPrice,
    });
    await order.save();
    res.status(201).json({
      message: 'Successfully Created Order',
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to create Order',
      success: false,
      error: error.message,
    });
  }
};

//get all order
const getAllOrderFromDb = async (): Promise<IOrder[]> => {
  return await orderModel.find();
};

//get order by Id
const getOrderByIdFromDB = async (_id: string): Promise<IOrder | null> => {
  return await orderModel.findById(_id);
};

//updat order
const UpdateOrderByIdFromDB = async (
  id: string,
  updateData: Partial<IOrder>,
): Promise<IOrder | null> => {
  return await orderModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};
//delete order
const deleteOrderFromDB = async (id: string): Promise<IOrder | null> => {
  return await orderModel.findByIdAndDelete(id);
};

const calculateRevenueFromDB = async (): Promise<number> => {
  try {
    const result = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ['$quantity', '$totalPrice'] } },
        },
      },
    ]);
    return result.length > 0 ? result[0].totalRevenue : 0;
  } catch (error: any) {
    throw error;
  }
};
export const OrderServices = {
  createOrderIntoDb,
  getAllOrderFromDb,
  getOrderByIdFromDB,
  UpdateOrderByIdFromDB,
  deleteOrderFromDB,
  calculateRevenueFromDB,
};
