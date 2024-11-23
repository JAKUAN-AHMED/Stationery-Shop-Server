import { Request, Response } from 'express';
import ProductModel from '../Models/ProductModel';
import { ProductService } from '../services/productServices';

//create product
const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductService.createProductIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Failed to create product',
      details: error,
    });
  }
};

//get all product
const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const {searchTerm}=req.query;
    const products = await ProductService.getAllProductsFromDB(searchTerm as string);
    res.status(200).json({
      success: true,
      message: 'Successfully got all Products',
      products,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Product Not Found',
      datails: error,
    });
  }
};

//get a product by Id
const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const product = await ProductService.getProductByIdFromDB(productId);
    if (!product) {
      res.status(404).json({
        error: 'Product Not Found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Successfully got Product bY Id',
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to Fetch Product',
      details: error,
    });
  }
};

//update a product by Id
const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const updateData=req.body;
    const product = await ProductService.updateProductFromDB(
      productId,
      updateData,
    );
    if (!product) {
      res.status(404).json({
        error: 'Product Not Found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'product successfully updated',
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update Product',
      details: error,
    });
  }
};
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const product = await ProductService.deleteProductFromDB(productId);
    if (!product) {
      res.status(404).json({
        error: 'Product Not Found',
      });
      return;
    }
    res.status(200).json({
      message: 'product successfully deleted',
      status: true,
      product: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete Product',
      details: error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
