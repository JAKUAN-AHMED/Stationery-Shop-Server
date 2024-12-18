import { Request, Response } from 'express';
import { ProductService } from '../services/productServices';

//create product
const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductService.createProductIntoDB(req.body);
    res.status(201).json({
      message: 'Product created successfully',
      status: true,
      data: { product },
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
    const { searchTerm } = req.query;
    const products = await ProductService.getAllProductsFromDB(
      searchTerm as string,
    );
    res.status(200).json({
      message: 'Products retrieved successfully',
      status: true,
      data: [products],
    });
  } catch (error: any) {
    res.status(404).json({
      message: 'Product Not Found',
      status: false,
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
      message: 'Product retrieved successfully',
      status: true,
      data: { product },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to Fetch Product',
      status: false,
      details: error,
    });
  }
};

//update a product by Id
const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
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
      message: 'Product updated successfully',
      status: true,
      data: { product },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update Product',
      status: false,
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
      message: 'Product deleted successfully',
      status: true,
      product: {},
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete Product',
      status: false,
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
