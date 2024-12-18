import { Request, Response } from 'express';
import { OrderServices } from '../services/OrderServices';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await OrderServices.createOrderIntoDb(req, res);
    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to Create Order',
      status: false,
      error: error.message,
    });
  }
};
const getAllOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await OrderServices.getAllOrderFromDb();
    res.status(200).json({
      message: 'Orders retrived successfully',
      status: true,
      data:  orders ,
    });
  } catch (error: any) {
    res.status(404).json({
      message: 'Orders Not Found',
      status: false,
      datails: error,
    });
  }
};

const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { OrderId } = req.params;
    const order = await OrderServices.getOrderByIdFromDB(OrderId);
    if (!order) {
      res.status(404).json({
        error: 'Order Not Found',
      });
      return;
    }
    res.status(200).json({
      message: 'Order retrived successfully',
      status: true,
      data:  order ,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to Fetch order',
      status: false,
      details: error,
    });
  }
};

const UpdateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { OrderId } = req.params;
    const order = await OrderServices.UpdateOrderByIdFromDB(OrderId, req.body);
    if (!order) {
      res.status(404).json({
        error: 'order Not Found',
      });
      return;
    }
    res.status(200).json({
      message: 'Order  updated successfully',
      status: true,
      data: order ,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update Order',
      status: false,
      details: error,
    });
  }
};

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { OrderId } = req.params;
    const order = await OrderServices.deleteOrderFromDB(OrderId);
    res.status(200).json({
      message: 'Order successfully deleted',
      status: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete Product',
      status: false,
      details: error,
    });
  }
};

const calculateRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalRevenue = await OrderServices.calculateRevenueFromDB();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {totalRevenue} ,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to calculate revenue',
      status: false,
      details: error.message,
    });
  }
};
export const orderController = {
  createOrder,
  getAllOrder,
  getOrderById,
  UpdateOrder,
  deleteOrder,
  calculateRevenue,
};
