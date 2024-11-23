import { Request, Response } from 'express';
import { OrderServices } from '../services/OrderServices';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await OrderServices.createOrderIntoDb(req, res);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to Create Order',
      success: false,
      error: error.message,
    });
  }
};
const getAllOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await OrderServices.getAllOrderFromDb();
    res.status(200).json({
      success: true,
      message: 'Successfully got all orders',
      orders,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Orders Not Found',
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
      success: true,
      message: 'Successfully got Order bY Id',
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to Fetch order',
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
      success: true,
      message: 'order successfully updated',
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update Product',
      details: error,
    });
  }
};

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { OrderId } = req.params;
    const order = await OrderServices.deleteOrderFromDB(OrderId);
    res.status(200).json({
      message: 'order successfully deleted',
      status: true,
      order: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete Product',
      details: error,
    });
  }
};

const calculateRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalRevenue = await OrderServices.calculateRevenueFromDB();
    res.status(200).json({
      message: 'Revenu calculated Successfully',
      status: true,
      totalRevenue: { totalRevenue },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate revenue',
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
